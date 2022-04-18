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

// export const loginAPI = (body: {email: string, password: string}) => axios.post<>
