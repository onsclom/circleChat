var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


var io = require('socket.io')(server);

circles = [];

class player
{
    constructor(newId, circleData)
    {
        this.id = newId;
        this.circle = circleData;
    }
}

io.sockets.on('connection', (socket) =>
{
    console.log("new connection: " + socket.id);

    socket.on("join", (data) =>
    {
        circles.push({id: socket.id, circle: data});

        socket.emit("idMsg", socket.id);
    });

    setInterval(() => 
    {
        socket.emit("serverUpdateMsg", circles); 
    }, 50);

    socket.on("clientDrawMsg", (data) => 
    {
        
        for (let i=circles.length-1; i>=0; i--)
        {
            if (circles[i].id == socket.id)
            {
                circles[i].circle=data;
            }
        }
        

    });

    socket.on("disconnect", (reason) => 
    {
        for (let i=circles.length-1; i>=0; i--)
        {
            if (circles[i].id==socket.id)
            {
                circles.splice(i,1);
            }
        }
    });
});