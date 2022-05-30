const socket = io();

//get objects corresponding to various page elements
//from the DOM
const chatWindow = document.querySelector('.chat-window');

const renderMessage = message => {
    chatWindow.innerHTML = message;
}

//add event listener for receiving 'chat' message from server
socket.on('chat',message=>{
    //modify UI to add the received message
    renderMessage(message);
});