const socket = io();

//get objects corresponding to various page elements
//from the DOM
//const chatWindow = document.querySelector('.chat-text');
const chatText = document.getElementById('chat-text');



const renderMessage = message => {
    chatText.innerHTML = message;
}

//add event listener for receiving 'chat' message from server
socket.on('chat',message=>{
    //modify UI to add the received message
    renderMessage(message);
    console.log(message);
});