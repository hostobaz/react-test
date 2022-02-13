// dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// components
import NavBarLogin from './NavbarLogin';

// context
import { _LoginContext } from '../contexts/LoginContext';

function Navbar() 
{
    const Navigate = useNavigate();
    const _session = useContext( _LoginContext );

    return(
        <div>
            <ul>
                <li><Link to="/">Main</Link></li>
                { _session.login === "auth"     ?  <NavBarLogin /> : "" }
                { _session.login === undefined  ?  <li><a href="#" style={ { textDecoration:"underline", color: "darkblue", cursor:"pointer" } } onClick={ _session.authLogin }>Login</a></li> : "" }
                { _session.login === "auth"     ?  <li><a href="#" style={ { textDecoration:"underline", color: "darkblue", cursor:"pointer" } } onClick={ _session.authLogout }>Logout</a></li> : "" }
            </ul>
        </div>
    )
}

export default Navbar;