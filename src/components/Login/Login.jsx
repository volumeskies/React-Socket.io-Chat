import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './Login.scss';
import Redirect from "react-router-dom/es/Redirect";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            logged: false,
            roomID: ''
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('roomID', data=>{
            this.setRoomID(`${data['roomID']}`);
            this.setState(state=>({
                logged: !state.logged
            }));
        })
    }

    setRoomID(roomID){
        this.setState(state=>({ roomID: roomID }));
    }

    handleKeyPress(event){
        if(event.keyCode === 13){
            this.props.socket.emit('login', {
                username: `${event.target.value}`
            })
        }
    }

    render(){
        return(
            <header class='header'>
                {this.state.logged ? <Redirect to={{
                    pathname: `room/${this.state.roomID}`,
                    state: {
                        logged: this.state.logged
                    }
                }}/> : ''}
                <h1 class='header__heading'>welcome to chat</h1>
                <input class='header__input' type='text' maxLength='20' title=' ' required onKeyDown={this.handleKeyPress}/>
                <label class='header__label'>enter your name</label>
            </header>
        );
    }
};

export default Login;