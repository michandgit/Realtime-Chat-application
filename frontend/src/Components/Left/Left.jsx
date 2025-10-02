import React, { useState, useEffect, useRef } from 'react'
import './Left.css'
import user from '../../assets/user.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { useAuthStore } from '../../store/useAuthStore';
import avatarImg from "../../assets/user.png"
import MenuPopup from '../MenuPopup/MenuPopup';
import { useChatStore } from '../../store/useChatStore';
import SidebarSkeleton from '../SidebarSkeleton/SidebarSkeleton';


const Left = () => {
    const searchRef = useRef();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const { logout, authUser } = useAuthStore();
    const [open, setOpen] = useState(false);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();

    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);


   useEffect(()=>{
    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;
    setDisplayedUsers(filteredUsers);
   },[users,showOnlineOnly,onlineUsers]);
   
    if (isUserLoading) {
        return <SidebarSkeleton />
    }
    const handleOpen = () => {
        setOpen(!open);
    }

    const handleSearch =() =>{
        const query = searchRef.current.value.toLowerCase();
        const filtered = (showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users)
            .filter(user => user.fullName.toLowerCase().includes(query));
        setDisplayedUsers(filtered);
    }

    return (
        <div className='left'>
            <div className="upper-section">
               <div id="chats-dots">
               <h2>Chats</h2>
                <span onClick={handleOpen} className="three-dots">
                    <BsThreeDotsVertical style={{color: "white"}} />
                    {open && <MenuPopup />}
                </span>
               </div>
                <div className="online-users">
                    <input type="checkbox" checked={showOnlineOnly} onChange={(e) => setShowOnlineOnly(e.target.checked)} />
                    <span>Show online only </span>
                    <span>({onlineUsers.length === 0 ? 0 : onlineUsers.length - 1} online)</span>
                </div>

            </div>

            <div className="search">
                <input onChange={handleSearch} type="text" ref={searchRef} placeholder="Search a contact"/>
            </div>


            <div className="contacts">
                <ul>
                    {displayedUsers.map((user) => (
                        <li onClick={() => setSelectedUser(user)} key={user._id} className='contact'>
                            <img src={user.profilePic || avatarImg} alt={user.name} />
                            <span>{user.fullName}</span>
                            {onlineUsers.includes(user._id) && (
                                <span id="green-dot" ></span>
                            )}
                        </li>
                    ))}


                </ul>
            </div>

            <div className="bottom">
                <IoMdLogOut onClick={logout} id='logout' />
            </div>

        </div>
    )
}

export default Left
