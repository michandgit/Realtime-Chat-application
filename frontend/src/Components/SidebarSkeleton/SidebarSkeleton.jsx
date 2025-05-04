import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";



const SidebarSkeleton = () => {
  return (
    <div className='left'>
       <div className="upper-section">
                <h2>Chats</h2>
                <span   className="three-dots">
                   <BsThreeDotsVertical/>
                    
                </span>
            </div>

            <div className="search">
                <input type="text" />
            </div>
    </div>
  )
}

export default SidebarSkeleton
