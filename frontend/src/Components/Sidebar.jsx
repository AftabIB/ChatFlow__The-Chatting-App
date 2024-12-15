import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import SidebarSkeleton from './skeletons/SidebarSkeleton.jsx';

const Sidebar = () => {
//fetch the users 
    const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();

    //all online users: currently no one is online
    const onlineUsers = [];

    useEffect(() => {
        getUsers()
    },[getUsers]);

    if(isUsersLoading) return <SidebarSkeleton />

    //not in loading state 
    return (
        <div>
        Sidebar
        </div>
    )
}

export default Sidebar
