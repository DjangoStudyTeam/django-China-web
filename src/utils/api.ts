import ky from 'ky';

const api = {
  anno: ky.extend({
    prefixUrl: import.meta.env.VITE_API_BASE,
    timeout: 5000,
    hooks: {
      beforeRequest: [],
      afterResponse: [],
    },
  }),
};

export default api;
