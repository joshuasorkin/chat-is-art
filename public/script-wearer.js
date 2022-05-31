const socket = io();

//get objects corresponding to various page elements
//from the DOM
//const chatWindow = document.querySelector('.chat-text');
const chatText = document.getElementById('chat-text');
const chatSvg = document.getElementById('chat-svg');

function setSvg(){
    console.log("setting svg...");
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    chatSvg.setAttribute("width",window.innerWidth);
    chatSvg.setAttribute("height",window.innerHeight);
    //chatText.setAttribute("textLength",window.innerWidth);
    resizeText();
}

function resizeText(){
    var bbox = chatText.getBBox();
    //chatText.setAttribute("textLength",window.innerWidth/10);
    chatSvg.get(0).setAttribute('viewBox', 
    [bbox.x,
     bbox.y,
     bbox.width,
     bbox.height].join(' '));
    /*
    var widthTransform = window.innerWidth / bb.width;
    var heightTransform = window.innerHeight / bb.height;
    var value = widthTransform < heightTransform ? widthTransform : heightTransform;
    chatText.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");
    */
    //chatText.setAttribute("textLength",window.innerWidth);
}


const renderMessage = message => {
    chatText.innerHTML = message;
    resizeText();
}

//add event listener for receiving 'chat' message from server
socket.on('chat',message=>{
    //modify UI to add the received message
    renderMessage(message);
    console.log(message);
});