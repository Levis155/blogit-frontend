import { create } from "zustand";
import { persist } from "zustand/middleware";

function userStore(set) {
  return {
    user: null,
    setUserInfo: (userObject) => {
      set({ user: userObject });
    },
    removeUserInfo: () => {
      set({ user: null });
    },
  };
}

const useUserStore = create(persist(userStore, { name: "user_info" }));

export default useUserStore;
