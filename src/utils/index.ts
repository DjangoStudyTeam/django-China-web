import { FormikErrors, FormikValues } from 'formik';

export { default as api } from './api';
export * as storage from './storage';

type FormErrors<T extends FormikErrors<FormikValues>> = Partial<Record<keyof T, string[]>> & {
  non_field_errors?: string[];
};

const ensureStringArray = (value: string | string[] | undefined) => {
  if (typeof value === 'string') {
    return [value];
  }
  return value;
};

export const transFormikErrors = <T extends FormikErrors<FormikValues>>(
  errors: T,
): FormErrors<T> => {
  const formErrors: FormErrors<any> = {};
  for (const [key, value] of Object.entries(errors)) {
    formErrors[key] = ensureStringArray(value as string);
  }
  return formErrors;
};
