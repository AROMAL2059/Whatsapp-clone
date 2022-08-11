import React from 'react';
import "./Sidebar.css";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar'
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';


function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src='https://www.reuters.com/resizer/96QQz-RIAwbeGfvkKND1vQK-vaw=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/OOKGKTAAIBLDLGJVR7JBZKDKTY.jpg' />
                <div className='sidebar__headerRight'>

                    <IconButton>
                        <DonutLargeIcon /></IconButton>
                    <IconButton>
                        <ChatIcon /></IconButton>
                    <IconButton><MoreVertIcon /></IconButton>


                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                <IconButton>
                    <SearchOutlinedIcon fontSize='large'/>
                </IconButton>
              <input placeholder='Search or sart new chat' type="text"></input>
              </div>

            </div>
            <div className='sidebar__chats'>
             <SidebarChat />
             <SidebarChat />
             <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar;