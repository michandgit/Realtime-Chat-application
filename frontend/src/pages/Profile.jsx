import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react'
import avatarImg from '../assets/user.png'

const Profile = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if(!file){
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async()=>{
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({profilePic: base64Image})
        }
       
    }

    return (
        <div className="profile-section">
            <div className='profile'>
                <h2>Profile Settings</h2>
                <p>Manage your profile information</p>

                <form id="avatar-form">
                    <div className="avatar-container">
                        <img src={selectedImg || authUser.profilePic || avatarImg} alt="Avatar" className='avatar-img' />
                        <label htmlFor="avatar-upload" className='camera-icon'>
                            <Camera size={20} />
                        </label>
                        <input 
                            type="file" 
                            id="avatar-upload" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            disabled={isUpdatingProfile} 
                            style={{ display: "none" }} 
                        />
                    </div>
                   
                    <span className="upload-info">
                     {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                    </span>
                </form>

                <form className="profile-form">
                    <div className="control">
                        <label>Full Name</label>
                        <input type="text" placeholder={authUser?.fullName || "Enter your full name"} />
                    </div>

                    <div className="control">
                        <label>Email Address</label>
                        <input type="email" placeholder={authUser?.email || "Enter your email"} disabled />
                    </div>
                </form>

                <div className="account-info">
                    <p><strong>Member since:</strong> January 2024</p>
                    <p><strong>Account Status:</strong> Active</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
