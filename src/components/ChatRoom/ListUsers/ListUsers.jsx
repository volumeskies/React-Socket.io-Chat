import React from 'react'
import './ListUsers.scss';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";

class ListUsers extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            users: []
        }
    }

    componentDidMount() {
        this.props.socket.on('userJoined', data=>{
            console.log(`${data.username} joined`);
            this.setState({users: [...this.state.users, data.username]});
        });

        this.props.socket.on('listUsers', data=>{
            console.log('onlist users', data.users);
            this.setState({users: data.users});
        });
    }

    render() {
        const listUsers = this.state.users.map((user)=> <li className = 'users__listitem'>{user}</li>)
        return(
            <div className='users'>
                <CopyToClipboard text={window.location.href}>
                    <a className='users__copy'>copy link</a>
                </CopyToClipboard>
                <div className='users__list'>
                    Users in this room:
                    <ul className='users__ullist'>
                        {listUsers}
                    </ul>
                </div>
            </div>
        );

    }
}

export default ListUsers;