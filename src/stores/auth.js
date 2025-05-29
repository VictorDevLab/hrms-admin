import {defineStore} from 'pinia';
import axios from 'axios';
import router from '../router'; 

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        userId: null,
        isAuthenticated: false,
    }),

    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('http://localhost:3001/api/auth/login', {email, password});
                this.token = response.data.token;
                this.userId = response.data.useAuthStore
                this.isAuthenticated = true;
                router.push('/'); 
            } catch(error) {
                console.error('Login failed:', error);
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