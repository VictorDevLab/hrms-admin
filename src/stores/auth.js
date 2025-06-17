import {defineStore} from 'pinia';
import axios from 'axios';
import router from '../router'; 
import axiosInstance from '../axios'

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
                const response = await axiosInstance.post('/api/auth/login', {email, password});
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
                const response = await axiosInstance.get(`/api/users/${this.userId}`, { headers: { Authorization: AuthStr }})
                this.user = response
            } catch (error) {
                console.error('Error getting User Details:', error)
                throw error;
            }
        },
        async checkRefreshToken() {
            try {
                const response = await axiosInstance.post('/api/refresh', {}, { withCredentials: true });
                console.log("refresh...", response)
                this.token = response.data.accessToken;
                this.userId = response.data.user.id;
                await this.getUserDetails();
                this.isAuthenticated = true;
            } catch (error) {
                console.error('Refresh token failed:', error);
                this.logout(); 
            }
        },
        logout() {
            this.token = null;
            this.userId = null;
            this.isAuthenticated = false;
        }
    }
})