import { defineStore } from 'pinia';

let isAlreadyLoggedIn = false;
if (localStorage.getItem('bearerToken')) {
  isAlreadyLoggedIn = true;
}


const userId = localStorage.getItem('userId');
const isAdmin = localStorage.getItem('632c581c7a94b4ab91ed83ac');


export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    isLoggedIn: isAlreadyLoggedIn,
    userId: userId,
    isAdmin: isAdmin,
  }),

  actions: {
    register(data) {
      this.isLoggedIn = true;
      this.userId = data.user_id;
      this.isAdmin = data.is_admin;
    },
    login(data) {
      this.isLoggedIn = true;
      this.userId = data.user_id;
      this.isAdmin = data.is_admin;
    },
    logout() {
      this.isLoggedIn = false;
      this.userId = 0;
      this.isAdmin = false;
      localStorage.removeItem('bearerToken');
      localStorage.removeItem('userId');
    },
  },
});
