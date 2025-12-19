import { create } from "zustand";

import { User } from "~/services/authService";

interface AppState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  actions: {
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;
    clearUser: () => void;
  };
}

export const useAppState = create<AppState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  actions: {
    setUser: (user) => set({ user, isAuthenticated: user !== null }),
    setLoading: (isLoading) => set({ isLoading }),
    clearUser: () =>
      set({
        user: null,
        isAuthenticated: false,
      }),
  },
}));
