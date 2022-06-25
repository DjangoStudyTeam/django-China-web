import { LoginInfo } from '../apis/loginApi';
import storage from 'good-storage';

export interface CacheUtilType {
  setLoginInfo: (loginInfo: LoginInfo) => LoginInfo;
  getLoginInfo: () => LoginInfo;
  clearLoginInfo: () => void;
}

export const LOGIN_INFO = 'loginInfo';

export const CacheUtil: CacheUtilType = {
  setLoginInfo: (loginInfo) => {
    storage.set(LOGIN_INFO, loginInfo);
    return loginInfo;
  },
  getLoginInfo: () => {
    const loginInfo = storage.get(LOGIN_INFO);
    return loginInfo;
  },
  clearLoginInfo: () => {
    storage.remove(LOGIN_INFO);
  },
};
