import { AxiosError } from 'axios';
import { notification } from 'antd';

export interface FormError {
  [key: string]: Array<string>;
}

export const getNonFieldError = (error: Error) => {
  if (((error as unknown) as AxiosError)?.isAxiosError) {
    const re = error as AxiosError;

    const status = re.response?.status || 0;

    if (status >= 500) {
      return `${status}, 服务端错误`;
    }
    if (status >= 400) {
      if (re.response?.data['non_field_errors']) {
        return re.response?.data['non_field_errors'][0];
      }
      // ...
    }
  }

  return 'unknown error, not axios error';
};

export const getFieldError = (error: Error) => {
  if (((error as unknown) as AxiosError)?.isAxiosError) {
    const re = error as AxiosError;

    const status = re.response?.status || 0;

    if (status === 400) {
      return re.response?.data;
    }
  }

  return 'unknown error, not axios error';
};

export const showError = (err: Error, customMessage?: string) => {
  const ae = err as AxiosError;

  let description = null;
  if (customMessage) {
    description = customMessage;
  } else {
    description = ae.response?.data
      ? ae.response?.data[0]
      : ae.response?.status;
  }

  notification.error({
    message: '错误',
    description,
  });

  // setErrormsg(
  //     ae.response?.data.errors ? ae.response?.data.errors[0].detail : ae.response?.status,
  // );
};
