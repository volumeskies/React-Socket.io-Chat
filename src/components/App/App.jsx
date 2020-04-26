import React from 'react';
import Login from '../Login/Login.jsx';
import ChatRoom from '../ChatRoom/ChatRoom.jsx'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.scss';

class App extends React.Component{
    render(){
        return(
            <Router>
                <Route path='/' exact Component={Login}/>
                <Route path='/room' exact Component={ChatRoom}/>
            </Router>
        );
    }
}
export default App;