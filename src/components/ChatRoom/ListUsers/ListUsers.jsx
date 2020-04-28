import React from 'react'
import './ListUsers.scss';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";

class ListUsers extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='users'>
                <CopyToClipboard text={window.location.href}>
                    <a className='users__copy'>copy link</a>
                </CopyToClipboard>
                <div className='users__list'>
                    Users in this room:
                    <ul className='users__ullist'>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name2</li>
                        <li className='users__listitem'>Name3</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Name1</li>
                        <li className='users__listitem'>Namssssssssssssssssssssssssssssssssse1</li>
                    </ul>
                </div>
            </div>
        );

    }
}

export default ListUsers;