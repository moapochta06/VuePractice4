import axios from "axios";
const API = '/api'; 

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API}/products`)
        return response.data.data
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API}/signup`, userData)
        return response.data.data.user_token;
    } catch (error) {
        console.error('Error during registration:', error.message);
        throw error; 
    }
};

export const login = async (user) => {
    try {
        const response = await axios.post(`${API}/login`, user);
        return response.data.data.user_token; 
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
};

export const addCart = async (productId, token) => {  
    const response = await axios.post(
        `${API}/cart/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data.message;
};
