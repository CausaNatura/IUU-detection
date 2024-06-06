import { useAppDispatch } from 'hooks/reduxHooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doLogout } from 'store/slices/authSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(doLogout());
    navigate('/');
  }, [dispatch, navigate]);

  return <></>;
}

export default Logout;
