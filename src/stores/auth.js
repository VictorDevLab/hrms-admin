import {defineStore} from 'pinia';
import axios from 'axios';
import router from '../router'; 

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        userId: null,
        user: null,
        isAuthenticated: false,
    }),

    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('http://localhost:3001/api/auth/login', {email, password});
                this.token = response.data.accessToken;
                this.userId = response.data.user.id;
                await this.getUserDetails()
                this.isAuthenticated = true;
                router.push('/'); 
            } catch(error) {
                console.error('Login failed:', error);
                throw error;
            }
        }, 
        async getUserDetails() {
            const AuthStr = 'Bearer '.concat(this.token)
            try {
                const response = await axios.get(`http://localhost:3001/api/users/${this.userId}`, { headers: { Authorization: AuthStr }})
                this.user = response
            } catch (error) {
                console.error('Error getting User Details:', error)
                throw error;
            }
        },
        logout() {
            this.token = null;
            this.userId = null;
            this.isAuthenticated = false;
        }
    }
})