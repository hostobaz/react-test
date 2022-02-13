// dependencies
import { Outlet } from 'react-router';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';

// context
import { _LoginContext } from '../contexts/LoginContext';

function AuthPage() 
{   
    const location = useLocation();
    const _session = useContext( _LoginContext );
    const checkAuth = _session.login;

    return checkAuth === "auth" ? <Outlet /> : <Navigate to="/" state={ { from: location } } replace />;
}

export default AuthPage;