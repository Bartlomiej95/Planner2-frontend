import axios from 'axios';

const domain = 'http://localhost:3001';

export const fetchAllCompanies = () => axios.get(`${domain}/company/all`);

export const createNewUser = (email: string) => axios.post(`${domain}/register`, { email });