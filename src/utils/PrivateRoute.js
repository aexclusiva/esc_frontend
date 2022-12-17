import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './../hooks/UserContext';
import Loading from './Loading';
export default function PrivateRoute(props) {
   const { user, isLoading } = useContext(UserContext);
   const { component: Component, ...rest } = props;
   if(isLoading) {
      return <Loading/>
   }

   return user ? <Outlet /> : <Navigate to="/entrar" />;
}