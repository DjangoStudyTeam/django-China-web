import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const ForgotPassword = () => (
  <Container>
    <Row className="justify-content-center">
      <Col sm={12} md={6} lg={4}>
        <h3 className="mt-sm-3 mt-md-5">忘记密码</h3>
        <div className="text-muted">通过注册邮箱重置密码。</div>
        <div className="mt-sm-3 mt-md-5 text-info small">
          邮件已发送，请点击邮件中的链接重置密码。
        </div>
        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="form-email">
            <Form.Label>邮箱</Form.Label>
            <Form.Control type="email" placeholder="" />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg" className="mt-3" disabled>
              发送重置密码邮件 (60s)
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default ForgotPassword;
