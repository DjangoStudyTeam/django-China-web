import * as yup from 'yup';

import { Button, Container, Form, Row, Toast, ToastContainer } from 'react-bootstrap';
import { HTTPError, TimeoutError } from 'ky';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { api } from '../../utils';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useUserInfo } from '../../hooks';

const LoginSchema = yup.object().shape({
  username: yup.string().required('请输入用户名。'),
  password: yup.string().required('请输入密码。'),
});

const Login = () => {
  const [toastState, setToastState] = useState({ show: false, body: '' });
  const { setUserInfo } = useUserInfo();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { values, touched, handleSubmit, handleBlur, handleChange, errors, isSubmitting } =
    useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: LoginSchema,
      onSubmit: async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        try {
          const res = await api.anno.post('auth/login/', { json: values }).json();
          setUserInfo(res);
          Promise.resolve().then(() =>
            navigate(searchParams.get('redirect') || '/', { replace: true }),
          );
        } catch (err) {
          if (err instanceof HTTPError) {
            const res = err.response;
            if (res.status === 400) {
              setErrors(await res.json());
            }
          } else if (err instanceof TimeoutError) {
            setToastState({ show: true, body: '请求超时！' });
          } else {
            setToastState({ show: true, body: '未知错误！' });
          }
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <Container>
      <Row className="justify-content-md-center form-box" lg="3">
        <div>
          <h3 className="mt-sm-3 mt-md-5">登录 Django中文社区</h3>
          <Form className="mt-sm-3 mt-md-5" noValidate onSubmit={handleSubmit}>
            {errors.non_field_errors?.length > 0 && (
              <ul>
                {errors.non_field_errors.map((errMsg, index) => (
                  <li className="text-danger" key={index}>
                    {errMsg}
                  </li>
                ))}
              </ul>
            )}
            <Form.Group className="mb-3" controlId="usernameOrEmail">
              <Form.Label>用户名或邮箱</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && errors.username?.length > 0}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>密码</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password?.length > 0}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="mt-3"
                disabled={isSubmitting}
              >
                登录
              </Button>
            </div>
          </Form>
          <div className="mt-3">
            <Link to="/" className="link-primary">
              忘记密码？
            </Link>
          </div>
          <div className="mt-3">
            <Link to="/register" className="link-primary">
              立即注册
            </Link>
          </div>
        </div>
      </Row>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          bg="danger"
          onClose={() => setToastState({ show: false, body: '' })}
          show={toastState.show}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">请求错误</strong>
          </Toast.Header>
          <Toast.Body>{toastState.body}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Login;
