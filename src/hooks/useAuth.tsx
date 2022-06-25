import { LoginInfo, loginApi } from '../apis/loginApi';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { CacheUtil } from '../utils/CacheUtils';

interface IAuthUserContextType {
  isAuthed: boolean;
  user: LoginInfo;
  setAuthInfo: (userInfo: LoginInfo) => void;
}

interface IProps {
  children: ReactNode;
}

const AuthContext = createContext<Partial<IAuthUserContextType>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function ProvideAuth({ children }: IProps) {
  const [auth, setAuth] = useState<LoginInfo>(() => CacheUtil.getLoginInfo());
  console.log(auth);

  useEffect(() => {
    CacheUtil.setLoginInfo(auth);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthed: !!auth?.authToken,
        user: auth,
        setAuthInfo: (info) => setAuth(info),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
