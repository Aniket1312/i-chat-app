const express=require('express');
const app= express();
const http=require('http').createServer(app);
const port=3000;

http.listen(port,()=>{
    console.log(`listiening in port ${port}`)
    
})
app.use(express.static(__dirname + '/public'))
app.get('/',(req,res) => {
res.sendFile(__dirname +'/index.html');

})

const io=require('socket.io')(http)
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined' , name =>{

        console.log("new user",name)
        users[socket.id]= name;
        socket.broadcast.emit('user-joined',name)

    });   
      socket.on('send', message=>{
        socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });


})