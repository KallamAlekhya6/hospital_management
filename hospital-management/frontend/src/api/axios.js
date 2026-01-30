import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Add Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Failure (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // If we get an unauthorized error, clear local storage and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Only redirect if we are not already on the login or register page
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                window.location.href = '/login?expired=true';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
