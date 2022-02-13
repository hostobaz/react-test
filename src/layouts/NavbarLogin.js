// dependencies
import { Link } from 'react-router-dom';

function NavBarLogin() {
    return(
        <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
        </>
    )
}

export default NavBarLogin;