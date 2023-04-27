require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;
const SetInterval = process.env.SetInterval || 30;
const Robot = require("./uptimerobot");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 10, checkperiod: 120 } );

app.use(express.static(path.join(__dirname, 'public', 'public/js'))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// sockets
io.on('connection', (socket) => {
    console.log('a user connected');

    Robot.getAllMonitors.then((result) => {
        io.emit('new-status-data', JSON.parse(result));
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    /* broadcasting to all users that are connected with new stat data 
        every x secounds
    */

    function senNewData() {
        Robot.getAllMonitors.then((result) => {
            io.emit('new-status-data', JSON.parse(result));
        });

    }
    setInterval(senNewData, SetInterval*1000);

  });



// start
server.listen(port, () => {
    console.log(`listening on port: ${port}`);
});

