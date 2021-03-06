import * as yup from 'yup';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { Countdown } from '../../components/Countdown';
import { TimeoutError } from 'ky';
import { api } from '../../utils';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useToasts } from '../../hooks';

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().required('请输入邮箱。'),
});

const ForgotPassword = () => {
  const toasts = useToasts();
  const [disabled, setDisabled] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      setDisabled(true);
      try {
        await api.anno.post('auth/forgot_password/', { json: values }).json();
        setShowMsg(true);
      } catch (err) {
        if (err instanceof TimeoutError) {
          toasts?.create?.({
            header: `[${err.name}] ${err.message}`,
            body: '请求超时！',
            toastProps: { bg: 'danger' },
          });
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

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={4}>
          <h3 className="mt-3 mt-md-5">忘记密码</h3>
          <div className="text-muted">通过注册邮箱重置密码。</div>

          {showMsg ? (
            <div className="mt-3 mt-md-5 text-info small">
              如果邮箱与注册用户匹配，一封重置密码的邮件将发送至该邮箱，请点击邮件中的链接重置密码。
            </div>
          ) : null}

          <Form className="mt-3" noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="form-email">
              <Form.Label>邮箱</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder=""
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="mt-3"
                disabled={disabled}
              >
                发送重置密码邮件{' '}
                {disabled ? (
                  <>
                    (
                    <Countdown
                      active={disabled}
                      duration={60}
                      onFinished={() => {
                        setDisabled(false);
                        setShowMsg(false);
                      }}
                    ></Countdown>
                    )
                  </>
                ) : null}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
