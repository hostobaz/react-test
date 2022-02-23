// dependencies
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

// bootstrap
import { Container, Navbar, Offcanvas, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import NavBarLogin from './NavbarLogin';
import LoginPage from '../components/LoginPage';

// context
import { _LoginContext } from '../contexts/LoginContext';

function NavbarTop() 
{
    const _session = useContext( _LoginContext );

    return(
        <>
            <Navbar bg="light" expand={false}>
            <Container fluid>
                <Navbar.Brand href="/">UNISOFT</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">MENU</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link onClick={_session.hideNavbar} to="/">Main</Link>
                    { _session.login === "auth"     ?  <NavBarLogin /> : "" }
                    { _session.login === undefined  ?  <li><Link onClick={_session.hideNavbar} to="/login">Login</Link></li> : "" }
                    { _session.login === "auth"     ?  <li><Link to="" onClick={ _session.authLogout }>Logout</Link></li> : "" }
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
        </>
    )
}

export default NavbarTop;