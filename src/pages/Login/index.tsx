import * as yup from 'yup';

import { Button, Container, Form, Row } from 'react-bootstrap';
import { HTTPError, TimeoutError } from 'ky';
import { api, transFormikErrors } from '../../utils';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToasts, useUserInfo } from '../../hooks';

import { Link } from 'react-router-dom';
import type { UserInfo } from '../../components/UserInfoProvider';
import { useFormik } from 'formik';

const LoginSchema = yup.object().shape({
  username: yup.string().required('请输入用户名。'),
  password: yup.string().required('请输入密码。'),
});

const Login = () => {
  const toasts = useToasts();
  const { setUserInfo } = useUserInfo();

  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

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
          const res = await api.anno.post('auth/login/', { json: values }).json<UserInfo>();
          setUserInfo(res);
          Promise.resolve().then(() =>
            navigate(searchParams.get('redirect') || '/', { replace: true }),
          );
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
            if (response && response.status === 400) {
              setErrors(await response.json());
              return;
            }
          } else {
            toasts?.create?.({
              header: `[${(err as Error).name}] ${(err as Error).message}`,
              body: '未知错误！',
              toastProps: { bg: 'danger' },
            });
          }
        } finally {
          setSubmitting(false);
        }
      },
    });

  const formErrors = transFormikErrors(errors);

  return (
    <Container>
      <Row className="justify-content-md-center form-box" lg="3">
        <div>
          <h3 className="mt-sm-3 mt-md-5">登录 Django中文社区</h3>
          <Form className="mt-sm-3 mt-md-5" noValidate onSubmit={handleSubmit}>
            {formErrors.non_field_errors?.length && (
              <ul>
                {formErrors.non_field_errors.map((errMsg, index) => (
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
                isInvalid={touched.username && !!formErrors.username?.length}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.username?.[0]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>密码</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!formErrors.password?.length}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.password?.[0]}
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
                登录
              </Button>
            </div>
          </Form>
          <div className="mt-3">
            <Link to="/forgot-password" className="link-primary">
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
    </Container>
  );
};

export default Login;
