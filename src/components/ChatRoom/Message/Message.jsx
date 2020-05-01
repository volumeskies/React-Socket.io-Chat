import React from 'react'
import './Message.scss';

const Message = (props) => {
    return(
        <div className='message'>
            <span className='message__sender'>{props.username}</span>
            <span className='message__date'>{props.date}</span>
            <p className='message__text'>{props.text}</p>
        </div>
    );
}

export default Message;