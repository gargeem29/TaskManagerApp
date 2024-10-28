import axios from 'axios';

const AUTH_API_URL = 'http://localhost:8000/api/v1/auth';

export const register = async ({ name, email, password }) => {
    const response = await axios.post(`${AUTH_API_URL}/register`, { name, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
};

export const login = async ({ email, password }) => {
    const response = await axios.post(`${AUTH_API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
};
