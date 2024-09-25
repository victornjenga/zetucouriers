import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../utils";

const authStore = (set) => ({
  userProfile: null,
  allUsers: [],

  // Add user to state and persist to localStorage
  addUser: (user) => set({ userProfile: user }),

  // Remove user from state and localStorage
  removeUser: () => set({ userProfile: null }),

  // Fetch all users (for example, admin functionality)
  fetchAllUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users`);
      set({ allUsers: response.data });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth", // The key name in localStorage
    getStorage: () => localStorage, // Specify localStorage as the storage mechanism
  })
);

export default useAuthStore;
