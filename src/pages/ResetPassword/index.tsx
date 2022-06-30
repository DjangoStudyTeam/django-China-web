import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResetPassword = () => (
  <Container>
    <Row className="justify-content-center">
      <Col sm={12} md={6} lg={4}>
        <h3 className="mt-sm-3 mt-md-5">重置密码</h3>
        <Form className="mt-sm-3 mt-md-5">
          <Form.Group className="mb-3" controlId="form-new-password">
            <Form.Label>新密码</Form.Label>
            <Form.Control type="password" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form-new-password2">
            <Form.Label>确认密码</Form.Label>
            <Form.Control type="password" placeholder="" />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg" className="mt-3">
              重置密码
            </Button>
          </div>
        </Form>
        <div className="d-flex flex-column align-items-center mt-sm-3 mt-md-5">
          <div>
            <FontAwesomeIcon className="text-success" icon={['far', 'circle-check']} size="4x" />
          </div>
          <div className="text-success mt-3">重置密码成功！</div>
          <div className="mt-2">
            <Button variant="primary" type="submit" size="sm">
              立即登录
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);

export default ResetPassword;
