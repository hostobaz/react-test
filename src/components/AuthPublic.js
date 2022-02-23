// dependencies
import { Outlet } from 'react-router';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';

// context
import { _LoginContext } from '../contexts/LoginContext';

function AuthPublic() 
{   
    const location = useLocation();
    const _session = useContext( _LoginContext );
    const checkAuth = _session.login;

    return checkAuth === undefined ? <Outlet /> : <Navigate to="/dashboard" state={ { from: location } } replace />;
}

export default AuthPublic;