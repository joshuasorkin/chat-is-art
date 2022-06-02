const socket = io();

//get objects corresponding to various page elements
//from the DOM
//const chatWindow = document.querySelector('.chat-text');
const chatText = document.getElementById('chat-text');



const renderMessage = message => {
    chatText.innerText = message;
}

//add event listener for receiving 'chat' message from server
socket.on('chat',message=>{
    //modify UI to add the received message
    renderMessage(message);
    console.log(message);
});

socket.on('previous_messages',(dataArray)=>{
    let filtered = dataArray.filter(item => item.length>0);
    renderMessage(filtered[filtered.length-1]);
});