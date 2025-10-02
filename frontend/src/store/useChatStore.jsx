import {create} from "zustand"
import toast from 'react-hot-toast'
import { axiosInstance } from "../lib/axios"
import { useAuthStore } from "./useAuthStore"


export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    getUsers: async()=>{
        set({isUserLoading: true});
        try {
            const res = await axiosInstance.get("/message/users");
            set({users: res.data});

        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUserLoading: false})
        }
    },
    getMessages: async (userId)=>{
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading: false})
        }
    },
    setSelectedUser: (selectedUser) => set({selectedUser}),
    sendMessages: async (messageData) => {
        const {selectedUser,messages} = get();
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket;
        if (!socket || !socket.connected) {
            console.error("Socket is not connected");
            return;
        }
    
        socket.on("newMessage", (newMessage) => {
        //   const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        //   if (!isMessageSentFromSelectedUser) return;
         const isRelevant =
                        newMessage.senderId === selectedUser._id ||
                        newMessage.receiverId === selectedUser._id;
                    if (!isRelevant) return;
    
          set({
            messages: [...get().messages, newMessage],
          });
        });
      },
    
      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) {
            console.error("Socket is not available");
            return;
        }
        socket.off("newMessage");
      },
    

}))

