const socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById('send-container');
const msgInp = document.getElementById('msgInp');
const msgContainer = document.querySelector(".container");
var audio = new Audio('ping.mp3');

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);

    if(position == 'left')
    audio.play();
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = msgInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    msgInp.value = '';
})
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
})

socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat!`, 'left')
})