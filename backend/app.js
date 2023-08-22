var app = require('express')();
var http = require('http').Server(app);//for accessing local server
var path = require('path');//sending path for index.html here path refer to current dir
const { Socket } = require('socket.io');


//always connect to socket in root file
//connecting to socket.io
var io = require('socket.io')(http);
app.get('/', function (req, res) {
    const options = {
        root: path.join(__dirname)
    }
    var filename = "index.html"
    res.sendFile(filename, options);//sending path of index to render
})
var users = 0;
//when ever we connect anything then this function will start
//here 'socket' is a object of user connected to socket
//here on is use to catch event like connection and disconnection
io.on('connection', function (socket) {
    console.log("A user connected")
    users++;
    //here we are sending message to front end when any user gets connected
    // setTimeout(function(){
    //     socket.send("Sending you a message from backend");
    // },3000)
    // setTimeout(function(){
    //     //emit is use to create custom message
    //     //we can send object or string
    //     socket.emit('MyCustomEvent',{description:"A custom message"});
    // },4000)
    //When ever any user disconnect
    //Receving message from client side
    // socket.on('ClientToServer',function(data){
    //     console.log(data.description)
    // })
    io.emit('broadcast',{message: users + ' users connected'})
    socket.broadcast()
    socket.on('disconnect', function (socket) {
        console.log("A user disconnected");
        users--;
        io.emit('broadcast',{message: users + 'users connected'})
    });
});

http.listen(5000, function () {
    console.log("server connected");
})