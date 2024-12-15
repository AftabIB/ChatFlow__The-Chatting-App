import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

// Create the Zustand store for chat management

export const useChatStore = create((set) => ({
  messages: [], // Holds the list of messages
  users: [], // Holds the list of users
  selectedUser: null, // Holds the currently selected user
  isUsersLoading: false, // Indicates if the users are loading
  isMessagesLoading: false, // Indicates if the messages are loading

  // Users Fetch function: fetch users from the API
  getUsers: async () => {
    // Set loading state before making the API request
    set({ isUsersLoading: true });
    try {
      // Fetch the users data from the API
      const res = await axiosInstance.get("/messages/users");

      // Update the users state with the fetched data
      set({ users: res.data });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      // Set loading state to false after the API request completes
      set({ isUsersLoading: false });
    }
  },

  // Messages Fetch function: fetch messages for selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      // Fetch the messages data for the given userId
      const res = await axiosInstance.get(`/messages/${userId}`);
      // Update the messages state with the fetched data
      set({ messages: res.data });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Function to set the currently selected user
  setSelected: async (selectedUser) => set({ selectedUser }),
}));
