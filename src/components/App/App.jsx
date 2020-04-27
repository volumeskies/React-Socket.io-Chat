import React from 'react';
import './App.scss';
import Login from '../Login/Login.jsx';
import ChatRoom from '../ChatRoom/ChatRoom.jsx'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component{
    render(){
        return(
            <Router>
                <Route path='/' exact component={Login}/>
                <Route path='/room:id' exact component={ChatRoom}/>
            </Router>
        );
    }
}
export default App;