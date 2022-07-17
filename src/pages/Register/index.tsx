import * as yup from 'yup';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { HTTPError, TimeoutError } from 'ky';
import { api, transFormikErrors } from '../../utils';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToasts } from '../../hooks';

const RegisterSchema = yup.object().shape({
  username: yup.string().required('请输入用户名。'),
  email: yup.string().required('请输入邮箱。'),
  password: yup.string().required('请输入密码。'),
  re_password: yup
    .string()
    .required('请输入确认密码。')
    .oneOf([yup.ref('password')], '两次输入的密码不一致。'),
  invitation_code: yup.string().required('请输入邀请码。'),
});

const Register = () => {
  const toasts = useToasts();
  const navigate = useNavigate();

  const { values, touched, handleSubmit, handleBlur, handleChange, errors, isSubmitting } =
    useFormik({
      initialValues: {
        username: '',
        email: '',
        password: '',
        re_password: '',
        invitation_code: '',
      },
      validationSchema: RegisterSchema,
      onSubmit: async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        try {
          await api.anno.post('auth/register/', { json: values }).json<any>();
          navigate('/', { replace: true });
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
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={4}>
          <h3 className="mt-sm-3 mt-md-5">创建 Django中文社区账户</h3>
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
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>用户名</Form.Label>
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

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>邮箱</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder=""
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!formErrors.email?.length}
              />
              <Form.Control.Feedback type="invalid">{formErrors.email?.[0]}</Form.Control.Feedback>
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
                {formErrors.password?.map((errMsg, index) => (
                  <>
                    <span key={index}>{errMsg}</span>
                    <br></br>
                  </>
                ))}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="rePassword">
              <Form.Label>确认密码</Form.Label>
              <Form.Control
                type="password"
                name="re_password"
                value={values.re_password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.re_password && !!formErrors.re_password?.length}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.re_password?.[0]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="invitationCode">
              <Form.Label>邀请码</Form.Label>
              <Form.Control
                type="text"
                name="invitation_code"
                value={values.invitation_code}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.invitation_code && !!formErrors.invitation_code?.length}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.invitation_code?.[0]}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg" className="mt-3">
                注册
              </Button>
            </div>
            <div className="mt-3 small">
              <a href="#">收不到激活邮件？</a>
            </div>
            <div className="mt-3 small">
              <span>已有账户？</span>
              <a href="/login">登录</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
