import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Login = () => (
  <Container>
    <Row className="justify-content-center">
      <Col sm={12} md={6} lg={4}>
        <h4 className="mt-sm-3 mt-md-5">登录 Django中文社区</h4>
        <Form className="mt-sm-3 mt-md-5">
          <ul>
            <li className="text-danger">无法使用所提供的账户登录</li>
          </ul>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>用户名或邮箱</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>密码</Form.Label>
            <Form.Control type="password" placeholder="" />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg" className="mt-3" disabled>
              登录
            </Button>
          </div>
          <div className="mt-3 small">
            <a href="#">忘记密码？</a>
          </div>
          <div className="mt-3 small">
            <a href="/register">立即注册</a>
          </div>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default Login;
