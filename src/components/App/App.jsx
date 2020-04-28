import React from 'react';
import './App.scss';
import Login from '../Login/Login.jsx';
import ChatRoom from '../ChatRoom/ChatRoom.jsx'
import {BrowserHistory} from 'react-router'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Router history={BrowserHistory}>
                <Route path='/' exact component={() => (<Login socket={this.props.socket}/>)}/>
                <Route path='/room/:id' exact component={(props) => (<ChatRoom {...props} socket={this.props.socket}/>)}/>
            </Router>
        );
    }
}
export default App;