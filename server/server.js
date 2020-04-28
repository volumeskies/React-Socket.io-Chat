const path = require('path');
const express = require('express');
const app = express();
const shortid = require('shortid');
const publicPath = path.join(__dirname, '../public');
const port = 8080;
const socket = require('socket.io');

/* Using public and build directories
   to handle static files properly
*/
app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, '/index.html'));
});

/* Express' and socket's server listening */
const server = app.listen(port);
const io = socket(server);

/* List of all connected users */
let users = {};

/* An array of current rooms */
let rooms = [];

/* Handling user's behaviour in app */
io.sockets.on('connection', function(socket) {
    console.log("server connection with socket: ", socket.id);
    socket.on('login', data=>{
        // Temporary user plain object
        let user = {
            username: '',
            socket: '',
            room: '',
        }
        // Generates random room id
        let roomID = shortid.generate();
        socket.join(`${roomID}`);

        user.username = data.username;
        user.socket = socket.id;
        user.room = roomID;
        users[socket.id] = user;

        rooms.push(roomID);
        socket.emit('roomID', {roomID: roomID});

        console.log(users);
    });


});