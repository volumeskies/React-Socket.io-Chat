import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './Login.scss';

class Login extends React.Component{
render(){
    return(
        <header class='header'>
            <h1 class='header__heading'>welcome to chat</h1>
            <input class='header__input' type='text' maxLength='20' title=' ' required/>
            <label class='header__label'>enter your name</label>
        </header>
    );
}
};

export default Login;