import { createContext, useEffect, useState } from 'react';

import { storage } from '../utils';

export const UserInfoContext = createContext({});

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => storage.get('login'));

  useEffect(() => {
    storage.set('login', userInfo);
  }, [userInfo]);

  return (
    <UserInfoContext.Provider
      value={{
        isAuthenticated: !!userInfo?.key,
        userInfo: userInfo,
        setUserInfo: (info) => setUserInfo(info),
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
