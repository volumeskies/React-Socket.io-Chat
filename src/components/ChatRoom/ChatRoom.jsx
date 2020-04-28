import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './ChatRoom.scss';
import ListUsers from "././ListUsers/ListUsers.jsx";
import Chat from "././Chat/Chat.jsx";

class ChatRoom extends React.Component{

    componentDidMount() {
        this.props.location.state === undefined? console.log('meh'):console.log('yeeeeeeaa');
    }

    render(){
        return(
            <>
                <ListUsers/>
                <Chat/>
            </>
        );
    }
}
export default ChatRoom;