const express = require("express");
const socketIO = require("socket.io");
const app = express();


const http = require("http");
const server = http.createServer(app);
const io = socketIO(server);

app.get("/",function(req,res){
     res.status(200).json({
          message : "Success"
     })
});


io.on("connection",function(socket){
     console.log("New User Connected", socket.id);

     socket.on("message",(data) => {
          console.log(data)
          socket.broadcast.emit('new-message', data);
     })

     socket.on("disconnect",function(){
          console.log(socket.id," Disconnected")
     });
});



server.listen(process.env.PORT || 3000,function(){
     console.log("App running in port " + process.env.PORT || 3000);
})