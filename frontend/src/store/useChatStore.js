import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./useAuthStore.js"

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Fetch users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load users. Please try again."
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for the selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load messages. Please try again."
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a new message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // update the message array in realtime
  subscribeToMsg: () => {
    const {selectedUser} = get();
    // no selected chat, return it
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    // Optimize it
    socket.on("newMessage",(newMessage) => {
      
      //only send the message to particular chat is selected
      const isMsgSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if(!isMsgSentFromSelectedUser) return;
      
      set({
        messages: [...get().messages, newMessage],
      })
    });
  },

  unSubscribeToMsg: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage")
  },

  // Set the currently selected user
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
