import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      //after refresh we are still logged in, hence we are authenticated user
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");

      //as soon as we signup, we get logged in, hence here it is necessary
      get().connectSocket();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      // whenever we logged in, we need to connect the socket immediately
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!!");

      // whenever we logged out, we need to disconnect the socket immediately
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  //upload the image on cloudinary
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.post("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log("Error in update profile: ", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the profile."
      );
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  //Usecase: when we want to login, signup or check the user is authenticated
  connectSocket: () => {
    //if user is not auth or already connected, don't create the connection
    const { authUser } = get(); 
    if (!authUser || get().socket?.connected) return; // Check authentication and connection status

    const socket = io(BASE_URL, {
      // handshake to share id
      query: {
        userId: authUser._id,
      }
    }); // Create a new socket instance
    socket.connect(); // Explicitly connect the socket
    set({socket: socket});

    // listen the online users and update the onlineUsers array with the IDs which are online
    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds});
    });
  },

  //Usecase: when we want logout
  disconnectSocket: () => {
    if(get().socket.connected) get().socket.disconnect();
  },
}));
