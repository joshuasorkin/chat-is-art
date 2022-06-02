require('dotenv').config();
const express = require('express');
const fs = require('fs');
//const admin = require('firebase-admin');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials:true
    }
});
const path = require('path');
const cors = require('cors');
const NameChecker = require('./NameChecker');
const MentionChecker = require('./MentionChecker');
const User = require('./User');
const RouterLoader = require('./routerLoader');

//init view engine
app.set('view engine','pug');

//initialize name checker
const nameChecker=new NameChecker();

//init mention checker
const mentionChecker=new MentionChecker(nameChecker);

//add body-parser middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set index page to static HTML file, using index.html
app.use(express.static(path.join(__dirname + '/public')))

//add CORS for processing req.body JSON
app.use(cors());

//load routes for REST API

const routerLoader = new RouterLoader(app);
routerLoader.loadRoutes();


io.on('connection',socket=>{
    
    fs.readFile("log.txt","utf8",(err,data)=>{
        if (err) {
            console.error(err)
            return
          }
        var dataArray=data.split("\n");
        //console.log(`data from log.txt:`);
        //console.log(dataArray);
        io.to(socket.id).emit('previous_messages',dataArray);
    });


    //get 'chat' event from client and broadcast the message
    socket.on('chat',message =>{

        message=mentionChecker.formatMentions(message);
        var broadcastMessage;
        broadcastMessage=`${socket.username}: ${message}`;
        io.emit('chat',broadcastMessage);
        fs.appendFile("log.txt",`${broadcastMessage}\n`,function(err) {     
            if (err) throw err;
            // if no error
            //console.log("Data is appended to file successfully.");
        });
    });
    //response to username update submission
    //todo: refactor these socket.on() event handlers into their own functions
    socket.on('submitUsername',(username)=>{
        //check if username is already in use
        if(nameChecker.getIDFromName(username)===null){
            nameChecker.addIDAndName(socket.id,username);
            if (socket.hasOwnProperty("username")){
                io.emit('chat-config',`${socket.username} has changed their name to "${username}".`);
            }
            else{
                io.emit('chat-config',`${username} is ready to chat.`)
            }

            socket.username=username;
            io.to(socket.id).emit('username_update',`Username successfully changed to ${username}.`,username);
        }
        else{
            console.log(`${username} is already in use`);
            io.to(socket.id).emit('username_update',`"${username}" is already in use.`,null);
        }
    });
    socket.on('disconnect',()=>{
        if(nameChecker.getNameFromID(socket.id)!==null){
            io.emit('chat-config',`${socket.username} has disconnected.`);
            nameChecker.removeID(socket.id);
        }
    })
    socket.on('login',(uid)=>{

    })
})

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});