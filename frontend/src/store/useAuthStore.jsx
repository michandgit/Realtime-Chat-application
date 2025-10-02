import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify";
import { io } from "socket.io-client";


export const useAuthStore = create((set,get) =>({
    authUser: null,
    isCheckingAuth:true,
    isSigningUp: false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers:[],
    socket:null,
    checkAuth : async () =>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth: ",error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false});
        }
    },
    signup: async(data)=>{
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup" , data);
            toast.success("Account created successfully!");
            set({authUser: res.data});
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false})
        }
    }
    ,
    logout: async()=>{
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logout successfully!");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    login : async (data) =>{
        set({isLoggingIn:true});
        console.log("Login data: ", data);
        try {
            const res = await axiosInstance.post("/auth/login",data);
            console.log("Login response: ", res);
            set({authUser:res.data});
            toast.success("Logged in successfully!");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            
        }finally{
            set({isLoggingIn: false})
        }
    },
    updateProfile: async(data)=>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile updated successfully!")

            
        } catch (error) {
            console.log("error in updating profile: " , error)
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false})

        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
    
        const socket = io("https://realtime-chat-application-yl4i.onrender.com", {
          query: {
            userId: authUser._id,
          },
          withCredentials:true,
          transports:["websocket"]
        });
        socket.connect();
    
        set({ socket: socket });
    
        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
      },
      disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
      },
}

))