import { create } from 'zustand';

// This store manages user authentication state across the app
export const useUserStore = create((set) => ({
  user: null,
  token: null,
  
  // Action to "Login" - later this will come from Django API
  login: (userData, token) => {
    // In real app: save token to localStorage
    localStorage.setItem('token', token);
    set({ user: userData, token: token });
  },

  // Action to "Logout"
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  // Helper to check if logged in
  isAuthenticated: () => !!useUserStore.getState().token,
}));