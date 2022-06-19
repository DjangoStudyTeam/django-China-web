import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Register = () => (
  <Container>
    <Row className="justify-content-center">
      <Col sm={12} md={6} lg={4}>
        <h4 className="mt-sm-3 mt-md-5">创建 Django中文社区账户</h4>
        <Form className="mt-sm-3 mt-md-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>用户名</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>邮箱</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>密码</Form.Label>
            <Form.Control type="password" placeholder="" />
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

export default Register;
