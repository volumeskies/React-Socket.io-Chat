import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './ChatRoom.scss';
import ListUsers from "././ListUsers/ListUsers.jsx";
import Chat from "././Chat/Chat.jsx";
import Redirect from "react-router-dom/es/Redirect";

class ChatRoom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            logged: this.props.location.state !== undefined,
            roomID: this.props.location.state !== undefined ? this.props.location.state.roomID : '',
        }
    }

    componentDidMount(){
        if(this.props.location.state !== undefined){
            this.props.socket.emit('getUsers', {roomID: this.state.roomID});
            this.props.socket.emit('getMessages', {roomID: this.state.roomID});
        }
    }

    render(){
        return(
            <>
                {this.state.logged?
                    <>
                        <ListUsers socket={this.props.socket}/>
                        <Chat socket={this.props.socket}/>
                    </>
                    :
                    <Redirect to={{
                        pathname: `/`,
                        state: {
                            roomID: window.location.pathname,
                        }}} />
                }
            </>
        );
    }
}
export default ChatRoom;