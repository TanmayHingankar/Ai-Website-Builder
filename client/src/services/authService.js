import axios from 'axios'

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

const api = axios.create({
  baseURL: `${apiBase}/api`,
  withCredentials: true
})

export const authService = {
  register: async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password })
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' }
    }
  },

  login: async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' }
    }
  },

  googleAuth: async (name, email, avatar) => {
    try {
      const { data } = await api.post('/auth/google', { name, email, avatar })
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Google auth failed' }
    }
  },

  logout: async () => {
    try {
      await api.get('/auth/logout')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Logout failed' }
    }
  },

  getCurrentUser: async () => {
    try {
      const { data } = await api.get('/user/me')
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to get current user' }
    }
  }
}

export default authService
