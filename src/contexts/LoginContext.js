import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';

import Cookie from 'universal-cookie';
import axios from 'axios';

// SET DEFAULT
export const _LoginContext = createContext({
    login       : undefined,
    token       : undefined,
    authLogin   : () => {},
    authLogout  : () => {},
    hideNavbar  : () => {}
});

function LoginContextProvider( props ) {

    const ck = new Cookie();
    const Navigate = useNavigate();
    const [login, setLogin] = useState(ck.get("login"));
    const [token, setToken] = useState(ck.get("token"));

    const authLogin = (event, data) => 
    {
        event.preventDefault();

        var enteredUsername = data.username;
        var enteredPassword = data.password;

 
        axios.get('/sanctum/csrf-cookie').then(response => 
        {
            axios.post('/api/login', 
            {
                email: enteredUsername,
                password: enteredPassword
            })
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
                    ck.set('login', 'auth', { path: '/' });
                    setLogin( ck.get("login") );
    
                    ck.set('token', data.toke.split("|")[1], { path: '/' });
                    setToken( ck.get("token") );

                    Navigate("/dashboard");
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
        });
    }



    const hideNavbar = () =>
    {
        document.getElementsByClassName("btn-close")[0].click();
    }

    const authLogout = () => 
    {

        axios.post('/api/logout', {}, {
            headers: {
                'Authorization': 'Bearer ' + ck.get("token"),
                'Content-Type': 'application/json'
              },
        }).then(function (response) 
        {
            // fake logout
            ck.remove('login');
            setLogin( ck.get("login") );

            ck.remove('token');
            setToken( ck.get("token") );

            hideNavbar();
        })
        .catch(function (error) 
        {
            console.log(error);
        });


        // axios.get('/sanctum/csrf-cookie').then(response => 
        // {

        // });

    }

    const context = {
        login       : login,
        token       : token,
        authLogin   : authLogin,
        authLogout   : authLogout,
        hideNavbar   : hideNavbar
    };

    return(
        <_LoginContext.Provider value={context}>  
            {props.children}
        </_LoginContext.Provider>
    );
}


export default LoginContextProvider;