import create from "zustand";

type UserStore = {
  address: string | null;
  username: string | null;
  loggedIn: boolean;
  setAddress: (address: string) => void;
  setUsername: (username: string) => void;
  setLoggedIn: (loggedIn: boolean) => void;
};

export const useUserStore = create<UserStore>(set => ({
  address: null,
  username: null,
  loggedIn: false,
  setAddress: address => set({ address }),
  setUsername: username => set({ username }),
  setLoggedIn: loggedIn => set({ loggedIn }),
}));
