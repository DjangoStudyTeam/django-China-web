import { Navbar as BootstrapNavbar, Container, Dropdown, Nav, NavDropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../utils/api';
import { storage } from '../../utils';
import { useUserInfo } from '../../hooks';

const AnnoNavbar = () => (
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

const AuthNavbar = () => {
  const { userInfo, setUserInfo } = useUserInfo();

  const logout = async (event) => {
    event.preventDefault();

    const ok = confirm('确定要退出登录吗？');
    if (!ok) return;

    try {
      await api.auth.post('auth/logout/');
    } catch (error) {
    } finally {
      storage.remove('login');
      setUserInfo(null);
    }
  };
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="md">
      <Container>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        {/* brand show on mobile */}
        <BootstrapNavbar.Brand className="d-md-none mx-auto" href="#">
          Django中文社区
        </BootstrapNavbar.Brand>
        <a className="text-light d-md-none ms-4" href="#">
          <FontAwesomeIcon icon={['far', 'bell']} />
        </a>
        <Dropdown className="d-md-none ms-4">
          <Dropdown.Toggle id="dropdown-basic" as={Nav.Link} className="nav-link text-light p-0">
            <img
              src={userInfo.user.avatar_url}
              className="rounded-circle"
              style={{ width: '24px' }}
              alt=""
            ></img>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item href="#/action-1">发帖</Dropdown.Item>
            <Dropdown.Item href="#/action-2">签到</Dropdown.Item>
            <Dropdown.Item href="#/action-3">我的主页</Dropdown.Item>
            <Dropdown.Item href="#/action-3">帖子收藏</Dropdown.Item>
            <Dropdown.Item href="#/action-3">个人设置</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>注销登录</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <BootstrapNavbar.Collapse id="navbar-nav">
          {/* brand show on desktop */}
          <BootstrapNavbar.Brand className="me-auto d-none d-md-block" href="#">
            Django中文社区
          </BootstrapNavbar.Brand>
          <a className="text-light d-none d-md-block ms-4" href="#">
            <FontAwesomeIcon icon={['far', 'bell']} />
          </a>
          <Dropdown className="d-none d-md-block ms-4">
            <Dropdown.Toggle id="dropdown-basic" as={Nav.Link} className="nav-link text-light p-0">
              <img
                src={userInfo.user.avatar_url}
                className="rounded-circle"
                style={{ width: '24px' }}
                alt=""
              ></img>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item href="#/action-1">发帖</Dropdown.Item>
              <Dropdown.Item href="#/action-2">签到</Dropdown.Item>
              <Dropdown.Item href="#/action-3">我的主页</Dropdown.Item>
              <Dropdown.Item href="#/action-3">帖子收藏</Dropdown.Item>
              <Dropdown.Item href="#/action-3">个人设置</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>注销登录</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

const Navbar = () => {
  const { isAuthenticated } = useUserInfo();
  return isAuthenticated ? <AuthNavbar /> : <AnnoNavbar />;
};

export default Navbar;
