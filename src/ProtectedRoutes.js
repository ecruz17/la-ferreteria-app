import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoggedInContext } from './helper/Context';

const ProtectedRoutes = () => {
    const { loggedIn } = useContext(LoggedInContext);
    return loggedIn ? <Outlet /> : <Navigate to='/' />;
}

export default ProtectedRoutes