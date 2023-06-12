import axios from 'axios';
import { NewCompanyType } from '../types/Companies';
import { ActivationUser } from '../types/Users';
import { NewProject } from '../types/Projects';

const domain = 'http://localhost:3001';

export const fetchAllCompanies = () => axios.get(`${domain}/company/all`);

export const createNewUser = (email: string) => axios.post(`${domain}/register`, { email });
export const activateNewUser = (data: ActivationUser) => axios.post(`${domain}/activate`, { data });
export const createNewCompany = (data: NewCompanyType) => axios.post(`${domain}/company`, { ...data });
export const login = (data: {email: string, password: string}) => axios.post(`${domain}/login`, { ...data }, { withCredentials: true});
export const logout = () => axios.delete(`${domain}/logout`, { withCredentials: true});
export const fetchUsersFromCompany = () => axios.get(`${domain}/company/users`, { withCredentials: true });
export const createNewProject = (data: NewProject) => axios.post(`${domain}/project`,  data , { withCredentials: true });
export const fetchAllProjects = () => axios.get(`${domain}/project/all`, { withCredentials: true });
export const updateProject = (data: NewProject) => axios.patch(`${domain}/project`, data, { withCredentials: true });
export const getProject = (id: string) => axios.get(`${domain}/project/${id}`, { withCredentials: true });