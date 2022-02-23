// dependencies
import React, { useEffect, useContext, useState} from 'react';
import { useNavigate } from 'react-router';

import axios from 'axios';

// bootstrap
import { Table, Container, Button, Modal, Form } from 'react-bootstrap';

// context
import { _LoginContext } from '../contexts/LoginContext';

function ManageUser() {

    useEffect(() => { retrieveUser();}, []);
    const _session = useContext( _LoginContext );
    
    const [userResult, setUserResult] = useState([]);
    const Navigate = useNavigate();



    function retrieveUser()
    {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + _session.token,
              'Content-Type': 'application/json'
            }
          }


          axios.get('/api/manages', config)
          .then(function (response) 
          {

              var data = response.data;

              if( response.status == 200 && response.statusText == "OK" )
              {
  
                  if( data[0] == 401 )
                  {
                      alert(data.message);
                      return false;
                  }
              }
              else if( response.status == 201 && response.statusText == "Created" )
              {
                  setUserResult( data.result );
              }

          })
          .catch(function (error) 
          {
              let response = error.response;

              if( response != undefined )
              {
                  if( response.status == 422 )
                  {
                      let messages = Object.keys( response.data.errors );
                      let getMessages =  response.data.errors;
  
                      if( messages.length > 0 )
                      {
                          alert( JSON.stringify(  getMessages) )
                          return false;
                      }
                  }
              }

              return false
          });



        // axios.get('/sanctum/csrf-cookie').then(response => 
        // {

        // });
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    const [username, setUsername] = useState("");
    const [email, setEmailGet] = useState("");
    const [userID, setUserID] = useState("");


    const handleShow = (event) => 
    {
        setShow(true);
        setEmailGet("");
        setUserID("");
        setUsername("");

        const { userid } = event.target.dataset;

        let config = {
            headers: {
              'Authorization': 'Bearer ' + _session.token,
              'Content-Type': 'application/json'
            }
          };

        axios.get('/api/manages/'+ userid, config)
        .then(function (response) 
        {
            let res = response.data.result;

            setEmailGet(res.email);
            setUserID(res.id);
            setUsername(res.name);
        })
        .catch(function (error) 
        {
            console.log(error);
            console.log(error.response);

        });
    };


    const saveButton = function(event)
    {
        event.preventDefault();

        const enteredUsername = username;
        const enteredEmail = email;

        var data = {};
            data["name"] = enteredUsername;
            data["email"] = enteredEmail;

        var data = JSON.stringify( data );

        let config = 
        {
            headers: 
            {
                'Authorization': 'Bearer ' + _session.token,
                'Content-Type': 'application/json'
            }
          };

        axios.put('/api/manages/'+ userID, data, config)
        .then(function (response) 
        {
            var data = response.data;


            if( response.status == 200 && response.statusText == "OK" )
            {

                if( data[0] == 401 )
                {
                    alert(data.message);
                    return false;
                }
            }
            else if( response.status == 201 && response.statusText == "Created" )
            {

                retrieveUser();
            }

        })
        .catch(function (error) 
        {
            let response = error.response;

            if( response != undefined )
            {
                if( response.status == 422 )
                {
                    let messages = Object.keys( response.data.errors );
                    let getMessages =  response.data.errors;

                    if( messages.length > 0 )
                    {
                        alert( JSON.stringify(  getMessages) )
                        return false;
                    }
                }
            }

            return false       
        });


        handleClose();
    };


    const triggerSend = (event) => 
    {
        let nodeButton = event.target.parentElement.parentElement.childNodes[1];
        nodeButton.querySelector(".sendSave").click();
    };

    return(
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            <Form onSubmit={saveButton}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" defaultValue={username} onKeyUp={(e) => setUsername( e.target.value )} placeholder="Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" defaultValue={email} onKeyUp={(e) => setEmailGet( e.target.value )} placeholder="Email" />
                </Form.Group>
                <Button style={{visibility: "hidden"}} className="sendSave" type="submit">
                    Click
                </Button>
            </Form>


            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={triggerSend}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>

        <Container>
            <h1>ManageUser</h1>
            <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {userResult.map((data, index) => (<ListUser key={index} index={index} data={data} handleShow={handleShow} />))}
                    </tbody>
                </Table>
        </Container>

        </>
    )
}


const ListUser = ({ data, index, handleShow }) => (
        <tr>
          <td>{( index+1)}</td>
          <td>{data.name}</td>
          <td>{data.email}</td>
          <td style={{textAlign:'center'}}><Button data-userid={data.id} onClick={ handleShow }>Edit</Button></td>
        </tr>
 );


export default ManageUser;