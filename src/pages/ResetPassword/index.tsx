import * as yup from 'yup';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { HTTPError, TimeoutError } from 'ky';
import { api, storage, transFormikErrors } from '../../utils';
import { useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import { useToasts } from '../../hooks';

const ResetPasswordSchema = yup.object().shape({
  new_password: yup.string().required('请输入新密码。'),
  re_new_password: yup
    .string()
    .required('请输入确认密码。')
    .oneOf([yup.ref('new_password')], '两次输入的密码不一致。'),
});

const ResetPassword = () => {
  const toasts = useToasts();

  const [done, setDone] = useState(false);
  const credentials = useMemo<{ uid: string; token: string }>(
    () => storage.get('reset_password', sessionStorage),
    [],
  );

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setErrors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: {
      new_password: '',
      re_new_password: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await api.anno.post('auth/reset_password/', { json: { ...values, ...credentials } }).json();
        storage.remove('reset_password', sessionStorage);
        setDone(true);
      } catch (err) {
        if (err instanceof TimeoutError) {
          toasts?.create?.({
            header: `[${err.name}] ${err.message}`,
            body: '请求超时！',
            toastProps: { bg: 'danger' },
          });
          return;
        }

        if (err instanceof HTTPError) {
          const { response } = err;
          if (response.status === 400) {
            const data = await response.json();
            const { token, uid, ...rest } = data;
            if (token) {
              toasts?.create?.({
                header: '验证信息已失效',
                body: token.join(' '),
                toastProps: { bg: 'danger' },
              });
            }

            if (uid) {
              toasts?.create?.({
                header: '验证信息已失效',
                body: token.join(' '),
                toastProps: { bg: 'danger' },
              });
            }

            setErrors(rest);
            return;
          }
        } else {
          toasts?.create?.({
            header: `[${(err as Error).name}] ${(err as Error).message}`,
            body: '未知错误！',
            toastProps: { bg: 'danger' },
          });
        }
      }
    },
  });

  const formErrors = transFormikErrors(errors);

  const form = (
    <>
      <h3 className="mt-3 mt-md-5">重置密码</h3>
      <Form className="mt-3 mt-md-5" noValidate onSubmit={handleSubmit}>
        {formErrors.non_field_errors?.length && (
          <ul>
            {formErrors.non_field_errors.map((errMsg, index) => (
              <li className="text-danger" key={index}>
                {errMsg}
              </li>
            ))}
          </ul>
        )}
        <Form.Group className="mb-3" controlId="form-new-password">
          <Form.Label>新密码</Form.Label>
          <Form.Control
            type="password"
            name="new_password"
            placeholder=""
            value={values.new_password}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.new_password && !!formErrors.new_password?.length}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.new_password?.[0]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="form-new-password2">
          <Form.Label>确认密码</Form.Label>
          <Form.Control
            type="password"
            name="re_new_password"
            placeholder=""
            value={values.re_new_password}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.re_new_password && !!formErrors.re_new_password?.length}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.re_new_password?.[0]}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            className="mt-3"
            disabled={isSubmitting}
          >
            重置密码
          </Button>
        </div>
      </Form>
    </>
  );

  const doneInfo = (
    <div className="d-flex flex-column align-items-center mt-sm-3 mt-md-5">
      <div>
        <FontAwesomeIcon className="text-success" icon={['far', 'circle-check']} size="4x" />
      </div>
      <div className="text-success mt-3">重置密码成功！</div>
      <div className="mt-2">
        <Button variant="primary" type="button" size="sm" as="a" href="/login">
          立即登录
        </Button>
      </div>
    </div>
  );

  const noCredentials = (
    <div className="d-flex flex-column align-items-center mt-sm-3 mt-md-5">
      <div>
        <FontAwesomeIcon className="text-danger" icon={['far', 'circle-xmark']} size="4x" />
      </div>
      <div className="text-danger mt-3">验证信息已失效！</div>
      <div className="mt-2">
        <Button variant="primary" type="button" size="sm" as="a" href="/forgot-password">
          重发验证邮件
        </Button>
      </div>
    </div>
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={4}>
          {!credentials ? noCredentials : !done ? form : doneInfo}
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
