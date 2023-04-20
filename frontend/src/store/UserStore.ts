import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  address: string | null;
  username: string | null;
  loggedIn: boolean;
  setAddress: (address: string | null) => void;
  setUsername: (username: string | null) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useUserStore = create(
  persist(
    (set: (fn: (state: UserState) => Partial<UserState>) => void) => ({
      address: null,
      username: null,
      loggedIn: false,
      setAddress: (address: string | null) => set(_ => ({ address })),
      setUsername: (username: string | null) => set(_ => ({ username })),
      setLoggedIn: (loggedIn: boolean) => set(_ => ({ loggedIn })),
    }),
    {
      name: "user-storage", // 给存储分配一个名称
      storage: createJSONStorage(() => localStorage), // 使用 localStorage
    }
  )
);
