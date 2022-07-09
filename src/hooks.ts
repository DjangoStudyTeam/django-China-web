import { useContext, useMemo } from 'react';

import { ToastsContext } from './components/ToastsProvider';
import { UserInfoContext } from './components/UserInfoProvider';

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};

export const useToasts = () => {
  const ctx = useContext(ToastsContext);
  return useMemo(
    () => ({
      create: ctx?.current?.create,
    }),
    [ctx?.current],
  );
};
