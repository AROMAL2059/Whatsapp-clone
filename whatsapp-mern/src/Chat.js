import React, { useState } from 'react';
import "./Chat.css";
import Avatar from '@mui/material/Avatar'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import axios from "./axios"

function Chat({ messages }) {

    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post("/messages/new", {
            message: input,
            name: "demo",
            timestamp: "just",
            received: true,
        });
        setInput("");
    };

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar />

                <div className='chat__headerInfo'>
                    <h3>Room name</h3>
                    <p>Last see at</p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon fontSize='medium' /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {messages.map((message) => (
                    <p className={`chat__message ${message.received && "chat__reciever"}`}
                    >
                        <span className='chat__name'>
                            {message.name}
                        </span>

                        {message.message}
                        <span className='chat__timestamp'>
                            {message.timestamp}
                        </span>
                    </p>))}


            </div>
            <div className='chat__footer'>
                <InsertEmoticonOutlinedIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message' type="text"></input>
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicOutlinedIcon />
            </div>
        </div>
    )
}

export default Chat;