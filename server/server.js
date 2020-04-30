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
let users = [];

/* An array of current rooms */
let rooms = [];

/* Handling user's behaviour in app */
io.sockets.on('connection', function(socket) {
    console.log("server connection with socket: ", socket.id);
    // User logged in event
    socket.on('login', data=>{
        // Temporary user plain object
        let user = {
            username: '',
            socket: '',
            room: '',
        }

        // If user was invited -> initializing with copied room id
        // else initializing with random room id (creating a new room)
        let roomID = data.invited ? data.invited.match(/([^/]*)$/)[0] : shortid.generate();

        user.username = data.username;
        user.socket = socket.id;
        user.room = roomID;
        users.push(user);

        rooms.push(roomID);

        socket.join(`${roomID}`);

        // Send to client generated room id
        socket.emit('roomID', {roomID: roomID});

        // Send to everyone except current socket
        socket.to(`${roomID}`).emit('userJoined', {username: user.username});

        console.log(users);
    });

    socket.on('getUsers', data => {
       let listUsers = [];
       users.forEach(elem => {
           console.log('elem', elem.username, data.roomID);
           if(elem.room === data.roomID) {
               listUsers.push(elem.username);
               console.log(elem.username);
           }
       });

       console.log('list', listUsers);

       socket.emit('listUsers', {users: listUsers});
    });

});