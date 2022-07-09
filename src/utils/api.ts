import ky from 'ky';
import { storage } from '.';

const api = {
  anno: ky.extend({
    prefixUrl: import.meta.env.VITE_API_BASE,
    timeout: 5000,
    hooks: {
      beforeRequest: [],
      afterResponse: [],
    },
  }),

  auth: ky.extend({
    prefixUrl: import.meta.env.VITE_API_BASE,
    timeout: 5000,
    hooks: {
      beforeRequest: [
        async (request, options) => {
          const login = storage.get('login');
          if (!login) return;
          const { key } = login;
          request.headers.set('Authorization', `Token ${key}`);
        },
      ],
      afterResponse: [],
    },
  }),
};

export default api;
