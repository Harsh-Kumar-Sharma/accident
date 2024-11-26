import { defineStore } from 'pinia'
import axios from 'axios';
import { API_ROUTES, BASE_URL } from '../constants/config'

export const userPinaStore = defineStore('pina', {
  state: () => ({
    userData: [],
  }),
  actions: {
    async saveAuthUser(data) {
      try {
        if (data.token.access.token) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.access.token
          localStorage.setItem("token", data.token.access.token);
          localStorage.setItem("user", JSON.stringify(data));
        }
        this.userData = data;
      } catch (error) {
        console.log(error)
      }
    },
    async session() {
      const token = localStorage.getItem('token')
      if (!token || token == 'undefined') throw new Error('Session expired. Please login again.')

      axios.defaults.headers['Authorization'] = 'Bearer ' + token
      await axios.post(`${BASE_URL}${API_ROUTES.AUTH.SESSION}`)
    },
    async logout() {
      const user = localStorage.getItem('user')
      if (user && user != 'undefined') {
        let parseUser = JSON.parse(user)
        const token = localStorage.getItem('token')
        axios.defaults.headers['Authorization'] = 'Bearer ' + token
        await axios.post(`${BASE_URL}${API_ROUTES.AUTH.LOGOUT}`, { id: parseUser.user.id })
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
  getters: {
    cartItems() {
      return this.cart;
    },
  },
});