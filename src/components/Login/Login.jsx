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
            console.log('on roomID', data.roomID);
            this.setState({
                logged: !this.state.logged,
                roomID: data.roomID
            });
        })
    }

    handleKeyPress(event){
        if(event.keyCode === 13){
            this.props.socket.emit('login', {
                username: `${event.target.value}`,
                invited: this.props.location.state !== undefined?`${this.props.location.state.roomID}`:false,
            })
        }
    }

    render(){
        return(
            <header className='header'>
                {this.state.logged ?
                    <Redirect to={{
                        pathname: `room/${this.state.roomID}`,
                        state: {
                                logged: this.state.logged,
                                roomID: this.state.roomID
                        }}} />
                    : ''}
                <h1 className='header__heading'>welcome to chat</h1>
                <input className='header__input' type='text' maxLength='20' title=' ' required onKeyDown={this.handleKeyPress}/>
                <label className='header__label'>enter your name</label>
            </header>
        );
    }
};

export default Login;