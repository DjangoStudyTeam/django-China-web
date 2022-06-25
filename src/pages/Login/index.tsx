import { Button, Container, Form, Row } from 'react-bootstrap';

import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { loginApi } from '../../apis/loginApi';
import { useAuth } from '../../hooks/useAuth';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// const schema = yup.object().shape({
//   username: yup.string().required(),
//   password: yup.string().required('必填项'),
//   //   terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
// });

const Login = () => {
  const { setAuthInfo } = useAuth();
  const history = useHistory();

  const handleSubmit = async (values: any) => {
    console.log('handleSubmit');
    const loginInfo = await loginApi.login(values.username, values.password);
    console.log(loginInfo);

    setAuthInfo && setAuthInfo(loginInfo);
    history.push({ pathname: '/' });
  };

  return (
    <Container>
      <Row className="justify-content-md-center form-box" lg="3">
        <div>
          <h3 className="title">登录Django中文社区</h3>
          <div> 欢迎回来！请使用用户名或邮箱登录。</div>

          <Formik
            // validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              username: '',
              password: '',
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mt-4">
                  <Form.Label>用户名或邮箱</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isValid={touched.username && !errors.username}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3" controlId="email">
                  <Form.Label>密码</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />

                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid mt-4">
                  <Button type="submit">登录</Button>
                </div>
              </Form>
            )}
          </Formik>
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
    </Container>
  );
};

export default Login;
