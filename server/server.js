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
let rooms = {};

/* Handling user's behavior in app */
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

        if(!rooms[roomID])
            rooms[roomID] = [];

        socket.join(`${roomID}`);

        // Send to client generated room id
        socket.emit('roomID', {roomID: roomID});

        // Send to everyone except current socket
        socket.to(`${roomID}`).emit('userJoined', {username: user.username});
    });

    // Get list of users in room
    socket.on('getUsers', data=>{
       let listUsers = [];
       users.forEach(elem => {
           if(elem.room === data.roomID)
               listUsers.push(elem.username);
       });
       socket.emit('listUsers', {users: listUsers});
    });

    // Send message to room
    socket.on('sendMessage', data=>{
        const date = new Date();
        const dateFormat = new Intl.DateTimeFormat('en' ,{hour12: false, weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})
        const dateFormatted = dateFormat.format(date);
        let username = '';
        let roomID = '';
        users.forEach(elem => {
            if(elem.socket === socket.id){
                username = elem.username;
                roomID = elem.room;
            }
        })
        let dataMessage = [{sender: username, date: dateFormatted, text: data.message}];
        rooms[roomID] = rooms[roomID].concat(dataMessage);
        io.in(`${roomID}`).emit('newMessage', dataMessage);
    });

    // Get previous messages
    socket.on('getMessages', data=>{
        let messages = rooms[`${data.roomID}`];
        socket.emit('chatHistory', {messages: messages});
    });

    // Delete user from listUsers when he/she/whoever disconnects
    socket.on('disconnect', ()=>{
        // Searching for socket's room id and username
        let roomID = '';
        let username = '';
        users.forEach(elem =>{
            if(elem.socket === socket.id){
                username = elem.username;
                roomID = elem.room;
            }
        })

        // Delete disconnected user from array users
        const index = users.map((elem)=>{ return elem.username; }).indexOf(username);
        users = users.filter((elem, indx)=>{
            if(indx !== index)
                return elem;
        })

        // Tell other users that this user has disconnected
        socket.to(`${roomID}`).emit('userDisconnected', {username: username});
    })
});