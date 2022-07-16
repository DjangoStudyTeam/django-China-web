import ky from 'ky';
import { storage } from '.';

// TODO: 如何统一处理 TimeoutError？

const anno = ky.extend({
  prefixUrl: import.meta.env.VITE_API_BASE,
  timeout: 5000,
  hooks: {
    beforeError: [
      (error) => {
        const header = `[${error.name}] ${error.message}`;
        const { response } = error;
        if (response && response.status > 400) {
          switch (response.status) {
            case 429:
              window.toasts?.current?.create?.({
                header,
                body: '请求过于频繁，请稍后重试。',
                toastProps: { bg: 'danger' },
              });
              break;
            case 500:
              window.toasts?.current?.create?.({
                header,
                body: '服务器出了一些问题。',
                toastProps: { bg: 'danger' },
              });
              break;
            default:
              break;
          }
        }

        return error;
      },
    ],
  },
});

const auth = anno.extend({
  hooks: {
    beforeRequest: [
      async (request, options) => {
        const login = storage.get('login');
        if (!login) return;
        const { key } = login;
        request.headers.set('Authorization', `Token ${key}`);
      },
    ],
  },
});

const api = {
  anno,
  auth,
};

export default api;
