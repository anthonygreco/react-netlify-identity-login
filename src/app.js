import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  useLocation,
  Navigate
} from 'react-router-dom';
import { useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

import Public from './public';
import Private from './private';
import Login from './login';

import './app.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const PrivateRoute = () => {
    const user = netlifyIdentity.currentUser();
    const location = useLocation();
    return user ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />;
  };
  
  const signin = callback => {
    setIsAuthenticated(true);
    netlifyIdentity.open();
    netlifyIdentity.on('login', userResponse => {
      setUser(userResponse);
      callback();
    });
  };
  
  const signout = callback => {
    setIsAuthenticated(false);
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      setUser(null);
      callback();
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Public />} />
        <Route path="/login" element={<Login login={signin} />} />
        <Route path="/private" element={<PrivateRoute />}>
          <Route path="/private" element={<Private logout={signout} />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <div className="nav">
        <a href="/">Public</a> | <a href="/private">Private</a>
      </div>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
