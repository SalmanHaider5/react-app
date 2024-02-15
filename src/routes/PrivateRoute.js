import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { QueryClient } from 'react-query';
import * as R from 'ramda';

const queryClient = new QueryClient();

const PrivateRoute = () => {

  const user = JSON.parse(localStorage.getItem('user')) || {};
  if(user) queryClient.setQueryData('user', user);
  const isAuthenticated = R.isNotNil(user.token);

  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoute;