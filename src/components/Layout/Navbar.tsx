import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';

const Navbar = () => (
  <BootstrapNavbar bg="dark" variant="dark" expand="md">
    <Container>
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      {/* brand show on mobile */}
      <BootstrapNavbar.Brand className="d-md-none mx-auto" href="#">
        Django中文社区
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Collapse id="navbar-nav">
        {/* brand show on desktop */}
        <BootstrapNavbar.Brand className="me-auto d-none d-md-block" href="#">
          Django中文社区
        </BootstrapNavbar.Brand>
        <Nav>
          <Nav.Link className="mt-2 mt-md-0" href="/login">
            登录
          </Nav.Link>
          <Nav.Link href="/register">注册</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);

export default Navbar;
