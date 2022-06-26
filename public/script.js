const socket = io();

//get objects corresponding to various page elements
//from the DOM
const chat = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-input');
const chatWindow = document.querySelector('.chat-window');
const chatError = document.querySelector('.chat-error');
const username = document.querySelector('.username-form');
const usernameInput = document.querySelector('.username-input');
const usernameDisplay = document.querySelector('.username-display');
const usernameResponse = document.querySelector('.username-response');
const imgWrap = document.getElementById("imgWrap");
const iframeWrap = document.getElementById("iframeWrap");

function iframeWrapClick(){
    chatInput.value = `<iframe src="${chatInput.value}" />`
}

function imgWrapClick(){
    chatInput.value = `<img src="${chatInput.value}" />`
}

const renderMessage = message => {
    const div = document.createElement('div')
    div.classList.add('render-message');
    div.innerHTML = message;
    chatWindow.appendChild(div);
    div.scrollIntoView();
}
//add event listener to chat submit button
chat.addEventListener('submit',event =>{
    //prevent page from reloading on form submission
    event.preventDefault();

    if (chatInput.value.trim().length > 0){
        sendChatMessageToServer();
    }
    else{
        chatErrorFadeout("Chat message cannot be blank.")
    }
    /*
    if(usernameDisplay.value===undefined){
        chatErrorFadeout("Cannot send message with blank username.");
    }
    else{
        sendChatMessageToServer();
    }
    */
});


function sendChatMessageToServer(){
    //send an event called 'chat' to server-side socket
    //carrying the submitted chat message
    socket.emit('chat',chatInput.value);
    //reset chat input field to blank once the message has been sent
    chatInput.value = '';
}

function chatErrorFadeout(errorMsg){
    chatError.innerHTML=(`<strong>${errorMsg}</strong>`);
    setTimeout(function(){
        chatError.innerHTML=""
    },2000)
}




//add event listener to username submit button
//todo: some of the code overlaps with chat.addEventListener()
//so maybe it can be refactored into a common addEventListenerToSubmit() function?

username.addEventListener('submit',event =>{
    //prevent page from reloading on form submission
    event.preventDefault();
    var usernameToSubmit=usernameInput.value;
    //check if username is blank
    if (usernameToSubmit===undefined||usernameToSubmit.trim().length===0||usernameToSubmit.includes(" ")){
        usernameResponse.innerHTML="<strong>Submitted username cannot be blank or contain a space.</strong>"
        setTimeout(function(){
            usernameResponse.innerHTML=""
        },2000)
    }
    else{

        /*send an event called 'submitUsername' to server-side socket
        carrying the submitted username for proposed change*/
        socket.emit('submitUsername',usernameInput.value);
        //reset chat input field to blank once the message has been sent
        chatInput.value = '';
    }

});

//add event listener for receiving 'chat' message from server
socket.on('chat',message=>{
    //modify UI to add the received message
    renderMessage(message);
});

//add event listener for receiving 'chat-config' message so that we can filter them out on the wearer page
socket.on('chat-config',message=>{
    //modify UI to add the received message
    renderMessage(message);
});

//add event listener for receiving 'username_update' message from server
socket.on('username_update',(message,username)=>{
    usernameResponse.innerHTML=`<strong>${message}</strong>`;
    setTimeout(function(){
        usernameResponse.innerText=" "
    },2000)
    if (username!==null){
        usernameDisplay.innerText=username;
        usernameDisplay.value=username;
        socket.username=username;
    }
})

socket.on('previous_messages',(dataArray)=>{
    dataArray.forEach(data=>{
        renderMessage(data);
    });
});
