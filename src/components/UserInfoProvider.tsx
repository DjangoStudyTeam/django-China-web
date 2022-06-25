import { createContext, useEffect, useState } from 'react';

import { storage } from '../utils';

type UserId = string;

interface UserInfo {
  key: string;
  user: {
    id: UserId;
    username: string;
    nickname: string;
    avatar_url: string;
  };
}

type UserInfoContextType = {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
};

export const UserInfoContext = createContext<UserInfoContextType>({
  isAuthenticated: false,
  userInfo: null,
  setUserInfo: (_) => {},
});

export const UserInfoProvider = ({ children }: { children: JSX.Element }) => {
  const [userInfo, setUserInfo] = useState(() => storage.get<UserInfo | null>('login'));

  useEffect(() => {
    storage.set('login', userInfo);
  }, [userInfo]);

  return (
    <UserInfoContext.Provider
      value={{
        isAuthenticated: !!userInfo?.key,
        userInfo: userInfo,
        setUserInfo: (info: UserInfo) => setUserInfo(info),
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export type { UserInfo };
