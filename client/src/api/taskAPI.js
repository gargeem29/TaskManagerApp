import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/v1/tasks';
const API_URL = 'https://taskmanagerapp-x3wm.onrender.com/api/v1/tasks';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Task API functions
export const getTasks = () => apiClient.get('/');
export const getTask = (id) => apiClient.get(`/${id}`);
export const createTask = (task) => apiClient.post('/', task);
export const updateTask = (id, task) => apiClient.put(`/${id}`, task);
export const deleteTask = (id) => apiClient.delete(`/${id}`);

