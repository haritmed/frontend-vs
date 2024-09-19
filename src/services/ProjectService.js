import axios from 'axios';

const PROJECT_API_BASE_URL = 'http://localhost:8080/api/projet';

export const getProjets = () => {
    return axios.get(PROJECT_API_BASE_URL);
};