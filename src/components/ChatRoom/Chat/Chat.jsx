import React from 'react'
import './Chat.scss';
import Message from '.././Message/Message.jsx';

class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            messages: []
        }
        this.handleSendClick = this.handleSendClick.bind(this);
        this.textRef = React.createRef();
        this.chatEnd = React.createRef();
    }

    componentDidMount() {
        this.props.socket.on('chatHistory', data=>{
            this.setState({messages: data.messages});
        })
        this.props.socket.on('newMessage', data=>{
            this.setState({messages: this.state.messages.concat(data)});
        })
    }

    componentDidUpdate(){
        this.chatEnd.current.scrollIntoView({behavior: 'smooth'});
    }

    handleSendClick(){
        this.props.socket.emit('sendMessage', {message: this.textRef.current.value});
        this.textRef.current.value = '';
    }

    render(){
        const messages = this.state.messages.map((message)=>
            <Message username={message.sender} date={message.date} text={message.text}/>);
        return(
            <div className='chat'>
                <div className='chat__window'>
                    {messages}
                    <div ref={this.chatEnd}></div>
                </div>
                <textarea ref={this.textRef} className='chat__input' placeholder='Enter your message...'/>
                <a className='chat__send' onClick={this.handleSendClick}>Send</a>
            </div>
        );
    }
}

export default Chat;