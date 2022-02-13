import { createContext, useState } from 'react';
import Cookie from 'universal-cookie';

// SET DEFAUILT
export const _LoginContext = createContext({
    login : undefined,
    token : undefined,
    authLogin : () => {},
    authLogout : () => {}
});

function LoginContextProvider( props ) {

    const ck = new Cookie();
    const [login, setLogin] = useState(ck.get("login"));
    const [token, setToken] = useState(ck.get("token"));

    const authLogin = () => 
    {
        // fake auth
        ck.set('login', 'auth', { path: '/' });
        setLogin( ck.get("login") );
    }

    const authLogout = () => 
    {
        // fake logout
        ck.remove('login');
        setLogin( ck.get("login") );
    }

    const context = {
        login       : login,
        token       : token,
        authLogin   : authLogin,
        authLogout   : authLogout
    };

    return(
        <_LoginContext.Provider value={context}>  
            {props.children}
        </_LoginContext.Provider>
    );
}


export default LoginContextProvider;