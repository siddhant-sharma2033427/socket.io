var app = require('express')();
var http = require('http').Server(app);//for accessing local server
var path = require('path');//sending path for index.html here path refer to current dir
const { Socket } = require('socket.io');

//always connect to socket in root file
//connecting to socket.io
var io=require('socket.io')(http);
app.get('/', function(req,res){
    var  options={
        root: path.join(__dirname)
    }
    console.log("hellow there");
    var filename = "index.html"
    res.sendFile(filename,options)//sending path of index to render
})

//to connect socket from front end to backend we need to add script to front end eg in index.html file
//when ever we connect anything then this function will start
//here 'socket' is a object of user connected to socket
io.on('connection',function(socket){
    console.log("A user connected")
    //When ever any user disconnect
    socket.on('disconnect',function(socket){
        console.log("A user disconnected");
    });
});

http.listen(3000, function () {
    console.log("server connected");
})