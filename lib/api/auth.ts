import { UserType } from '../../types/user';
import axios from '.';

interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post('/api/auth/signup', body);

export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login', body);

export const meAPI = () => axios.get('/api/auth/me');

export const logoutAPI = () => axios.delete('/api/auth/logout');
