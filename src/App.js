// dependencies
import { Routes,Route } from 'react-router-dom';

// components
import NavbarTop from './layouts/NavbarTop';
import Main from './components/Main';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';
import LoginPage from './components/LoginPage';
import AuthPublic from './components/AuthPublic';
import ManageUser from './components/ManageUser';

// context provider
import LoginContextProvider from './contexts/LoginContext';

function App() {

  const myObj = {
    name: 'John Doe',
    age: 35,
    sex: 'M',
    dob: new Date(1990, 1, 1)
  };



  return (
    <>
    <LoginContextProvider>
      <NavbarTop />
        <Routes>
          <Route path="/" element={ <Main name="11" bb="44" ss={myObj}/> } />

          <Route element={<AuthPublic />}>
            <Route path="/login" element={ <LoginPage /> } />
          </Route>



            <Route element={ <AuthPage /> }>
              <Route path="/profile" element={ <Profile /> } />
              <Route path="/dashboard" element={<Dashboard /> } />
              <Route path="/manage-user" element={<ManageUser /> } />
            </Route>
      </Routes>
    </LoginContextProvider>
    </>
  );
}

export default App;
