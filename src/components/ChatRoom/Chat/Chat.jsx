import React from 'react'
import './Chat.scss';

class Chat extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className='chat'>
                <div className='chat__window'></div>
                <textarea className='chat__input' placeholder='Enter your message...'>
                </textarea>
                <a className='chat__send'>Send</a>
            </div>
        );
    }
}

export default Chat;