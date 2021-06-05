const socket=io()


const form=document.getElementById('send-container');

const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');

const append=(message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);


}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you:${message}`,'right')
    socket.emit('send',message);
    messageInput.value=' ';

})


const namee=prompt("Enter your name to join");
socket.emit('new-user-joined',namee);

socket.on('user-joined', namee =>{
    append(`${namee} joined the chat` ,'right')

})

socket.on('receive', data =>{
    append(`${data.name} :${data.message}` ,'left')

})
socket.on('left', data =>{
    append(`${namee} left the chat` ,'left')

})

