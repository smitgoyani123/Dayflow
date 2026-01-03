// API utility functions with token handling
const API_BASE = '/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

const handleResponse = async (response) => {
    if (!response.ok) {
        try {
            const error = await response.json();
            throw new Error(error.message || error.error || `Request failed with status ${response.status}`);
        } catch (parseError) {
            throw new Error(`Request failed with status ${response.status}`);
        }
    }
    
    return response.json();
};

export const api = {
    get: async (url) => {
        try {
            const response = await fetch(`${API_BASE}${url}`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });
            return handleResponse(response);
        } catch (error) {
            if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED') || error.name === 'TypeError') {
                throw new Error('Backend server is not running. Please start the backend server on port 5000.');
            }
            throw error;
        }
    },
    
    post: async (url, data) => {
        try {
            const response = await fetch(`${API_BASE}${url}`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        } catch (error) {
            if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED') || error.name === 'TypeError') {
                throw new Error('Backend server is not running. Please start the backend server on port 5000.');
            }
            throw error;
        }
    },
    
    put: async (url, data) => {
        try {
            const response = await fetch(`${API_BASE}${url}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        } catch (error) {
            if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED') || error.name === 'TypeError') {
                throw new Error('Backend server is not running. Please start the backend server on port 5000.');
            }
            throw error;
        }
    },
    
    delete: async (url) => {
        try {
            const response = await fetch(`${API_BASE}${url}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });
            return handleResponse(response);
        } catch (error) {
            if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED') || error.name === 'TypeError') {
                throw new Error('Backend server is not running. Please start the backend server on port 5000.');
            }
            throw error;
        }
    },
};

