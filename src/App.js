// dependencies
import { Routes,Route } from 'react-router-dom';

// components
import Navbar from './layouts/Navbar';
import Main from './components/Main';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';

// context provider
import LoginContextProvider from './contexts/LoginContext';

function App() {
  return (
    <>
    <LoginContextProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route element={ <AuthPage /> }>
            <Route path="/profile" element={ <Profile /> } />
            <Route path="/dashboard" element={< Dashboard /> } />
          </Route>
      </Routes>
    </LoginContextProvider>
    </>
  );
}

export default App;
