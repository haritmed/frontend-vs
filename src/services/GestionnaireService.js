import axios from 'axios';

const ADMIN_API_BASE_URL = 'http://localhost:8080/api/gestionnaire';

// Fetch the admin profile
export const getAdminProfile = () => {
    return axios.get(`${ADMIN_API_BASE_URL}/profile`);
};