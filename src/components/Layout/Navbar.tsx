import {
  Navbar as BootstrapNavbar,
  Container,
  Dropdown,
  Nav,
  NavbarBrandProps,
} from 'react-bootstrap';
import { useCallback, useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../utils/api';
import { storage } from '../../utils';
import { useUserInfo } from '../../hooks';

const Brand = (props: NavbarBrandProps) => (
  <BootstrapNavbar.Brand {...props}>Django中文社区</BootstrapNavbar.Brand>
);

const AnnoNav = () => (
  <Nav>
    <Nav.Link className="mt-2 mt-md-0" href="/login">
      登录
    </Nav.Link>
    <Nav.Link href="/register">注册</Nav.Link>
  </Nav>
);

type AuthNavProps = {
  logout: (event: any) => Promise<void>;
  user: any;
  mobile?: boolean;
};

const AuthNav = ({ logout, user, mobile = false }: AuthNavProps) => {
  const responsiveCls = useMemo(
    () => (mobile ? 'd-block d-md-none' : 'd-none d-md-block'),
    [mobile],
  );

  return (
    <>
      <a className={'text-light ms-4 ' + responsiveCls} href="#">
        <FontAwesomeIcon icon={['far', 'bell']} />
      </a>
      <Dropdown className={'ms-4 ' + responsiveCls}>
        <Dropdown.Toggle id="dropdown-basic" as={Nav.Link} className="nav-link text-light p-0">
          <img
            src={user.avatar_url}
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
    </>
  );
};

const Navbar = () => {
  const { userInfo, isAuthenticated, setUserInfo } = useUserInfo();

  const logout = useCallback(async (event) => {
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
  }, []);

  const dAuthNav = <AuthNav logout={logout} user={userInfo?.user}></AuthNav>;
  const mAuthNav = <AuthNav logout={logout} user={userInfo?.user} mobile={true}></AuthNav>;
  const annoNav = <AnnoNav />;

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="md">
      <Container>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        {/* 移动端显示 */}
        <Brand className="mx-auto d-md-none"></Brand>
        {isAuthenticated ? mAuthNav : null}

        <BootstrapNavbar.Collapse id="navbar-nav">
          {/* 桌面端显示 */}
          <Brand className="me-auto d-none d-md-block"></Brand>
          {isAuthenticated ? dAuthNav : annoNav}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
