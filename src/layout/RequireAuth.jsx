import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncPreloadProcess } from '../states/isPreload/action';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import HeaderWithNavigation from '../components/Header';
import Loading from '../components/Loading';

export default function RequireAuth() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser) dispatch(asyncPreloadProcess());
  }, [authUser, dispatch]);

  if (isPreload) return null;
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Loading />
      <HeaderWithNavigation signOut={() => dispatch(asyncUnsetAuthUser())} />
      <Outlet />
    </>
  );
}
