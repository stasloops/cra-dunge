import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = process.env.NODE_ENV === 'production' ? 'https://web-production-201e.up.railway.app/api' : 'http://localhost:7777/api' 

axios.defaults.withCredentials = true
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            let config = {
                headers: {
                    Authorization: `Bearer ${Cookies.get('refreshToken')}`
                }
            }
            const res = await axios.get(`${API_URL}/refresh`, config)
            // Cookies.set('refreshToken', res.data.refreshToken, { secure: true, sameSite: 'None' })
            localStorage.setItem('token', res.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log(e);
            
        }
    }
    throw error;
})

export default $api;
