import { create } from "zustand";

interface AuthState {
  name: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  resetAuthState: () => void; // To clear states after form form submit
}

export const useAuthStore = create<AuthState>((set) => ({
  name: "", // Shared state for name
  email: "", // Shared state for email
  password: "", // Shared state for password
  setName: (name) => set({ name }), // Setter for name
  setEmail: (email) => set({ email }), // Setter for email
  setPassword: (password) => set({ password }), // Setter for password
  resetAuthState: () =>
    set({
      name: "",
      email: "",
      password: "",
    }), // Reset all states
}));

export default useAuthStore;
