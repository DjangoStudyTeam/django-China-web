import { useNavigate, useParams } from 'react-router-dom';

import { storage } from '../../utils';
import { useEffect } from 'react';

const ResetPasswordBlank = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    storage.set('reset_password', { uid, token }, sessionStorage);
    navigate('/reset-password', { replace: true });
  }, []);
  return null;
};

export default ResetPasswordBlank;
