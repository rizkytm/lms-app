import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;

      try {
        // In a real app, this would be an API call
        const response = await axios.post(`${API_URL}/api/auth/login`, {
          email,
          password,
        });

        // For demo purposes we'll simulate a successful login
        // const mockResponse = {
        //   data: {
        //     user: { id: 1, email, name: email.split('@')[0] },
        //     token: 'mock-jwt-token-' + Date.now(),
        //   },
        // };

        const { access_token, user } = response.data;

        this.user = user;
        this.token = access_token;
        this.isAuthenticated = true;

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', this.token);

        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(name, email, password, passwordConfirmation) {
      this.loading = true;
      this.error = null;

      try {
        // In a real app, this would be an API call
        const response = await axios.post(`${API_URL}/api/auth/register`, {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        });

        // For demo purposes we'll simulate a successful registration
        // const mockResponse = {
        //   data: {
        //     user: { id: Date.now(), email, name },
        //     token: 'mock-jwt-token-' + Date.now(),
        //   },
        // };

        const { user, token } = response.data;

        this.user = user;
        this.token = token;
        this.isAuthenticated = true;

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed';
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    async updateProfile(userData) {
      this.loading = true;
      this.error = null;

      try {
        // In a real app, this would be an API call
        // const response = await axios.put('/api/user/profile', userData, {
        //   headers: { Authorization: `Bearer ${this.token}` }
        // });

        // For demo purposes we'll simulate a successful update
        const updatedUser = { ...this.user, ...userData };

        this.user = updatedUser;

        // Update localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));

        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Profile update failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});
