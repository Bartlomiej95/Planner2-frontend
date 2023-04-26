import axios from 'axios';
import { NewCompanyType } from '../types/Companies';
import { ActivationUser } from '../types/Users';

const domain = 'http://localhost:3001';

export const fetchAllCompanies = () => axios.get(`${domain}/company/all`);

export const createNewUser = (email: string) => axios.post(`${domain}/register`, { email });
export const activateNewUser = (data: ActivationUser) => axios.post(`${domain}/activate`, { data });
export const createNewCompany = (data: NewCompanyType) => axios.post(`${domain}/company`, { ...data });