var app = require('express')();
var http = require('http').Server(app);//for accessing local server
var path = require('path');//sending path for index.html here path refer to current dir
const { Socket } = require('socket.io');

var io = require('socket.io')(http);
app.get('/', function (req, res) {
    const options = {
        root: path.join(__dirname)
    }
    var filename = "errorhandling.html"
    res.sendFile(filename, options);//sending path of index to render
});

var room_number = 1;
var full = 0;
io.on("connection",function(socket){
    console.log('A user connected');

    socket.join('room-'+ room_number);

    io.sockets.in('room-'+ room_number).emit('connectedRoom','You are connected to room no. '+ room_number);
    full++;
    if(full >= 2){
        full = 0;
        room_number++;
    }
    socket.on('disconnect',function(){
        console.log('A user disconnect');
        
    });
})

http.listen(5000,function(){
    console.log('server ready on 5000');
})