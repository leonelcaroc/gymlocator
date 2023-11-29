import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  admin: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
  owner: null,
  setAdmin: (data) => set({ admin: data }),
}));

export default useStore;
