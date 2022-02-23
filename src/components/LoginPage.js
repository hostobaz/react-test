// dependencies
import {Form, Button,  Container } from 'react-bootstrap';
import { useContext, useState } from 'react';

// context
import { _LoginContext } from '../contexts/LoginContext';


function LoginPage() {

    const _session = useContext( _LoginContext );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(email);
    console.log(password);

    const sendLogin = (event) =>
    {
        let data = {};
            data["username"] = email;
            data["password"] = password;
        _session.authLogin(event, data);
    };

    return(
        <>
        <Container style={{marginTop:"50px", width: "80%"}}> 
            <Form onSubmit={sendLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={(e) => {setEmail(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
        </>
    )
}

export default LoginPage;