import axios from './AxiosInstance';
import { toCamel } from '../utils/CaseUtil';

export interface User {
  id: string;
  username: string;
  nickname: string;
  avatarUrl?: string;
}

export interface LoginInfo {
  authToken: string;
  user: User;
}

export interface LoginType {
  login: (username: string, password: string) => Promise<LoginInfo>;
}

export const loginApi: LoginType = {
  login: async (username, password) => {
    const response = await axios.post('/auth/login/', {
      username,
      password,
    });

    return toCamel(response.data as any) as LoginInfo;
  },
};
