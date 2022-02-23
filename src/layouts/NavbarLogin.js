// dependencies
import { Link } from 'react-router-dom';
import { useContext } from 'react';


// context
import { _LoginContext } from '../contexts/LoginContext';


function NavBarLogin() {
    const _session = useContext( _LoginContext );

    return(
        <>
            <li><Link onClick={_session.hideNavbar} to="/dashboard">Dashboard</Link></li>
            <li><Link onClick={_session.hideNavbar} to="/manage-user">Manage User</Link></li>
            <li><Link onClick={_session.hideNavbar} to="/profile">Profile</Link></li>
        </>
    )
}

export default NavBarLogin;