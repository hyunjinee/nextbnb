import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/user';
import { UserState } from '../types/reduxState';

const initialState: UserState = {
  id: 0,
  email: '',
  lastname: '',
  firstname: '',
  birthday: '',
  isLogged: false,
  profileImage: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<UserType>) {
      // eslint-disable-next-line no-param-reassign
      state = { ...action.payload, isLogged: true };
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
