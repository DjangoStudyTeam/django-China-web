import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordBlank from './pages/ResetPasswordBlank';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<Outlet />}>
            <Route index element={<ResetPassword />} />
            <Route path=":uid/:token" element={<ResetPasswordBlank />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
