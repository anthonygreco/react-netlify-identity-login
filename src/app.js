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
  const [user, setUser] = useState(netlifyIdentity.currentUser());

  const PrivateRoute = () => {
    const location = useLocation();
    return user ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />;
  };
  
  const login = callback => {
    netlifyIdentity.open();
    netlifyIdentity.on('login', userResponse => {
      netlifyIdentity.close();
      setUser(userResponse);
      callback();
    });
  };
  
  const logout = callback => {
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
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/private" element={<PrivateRoute />}>
          <Route path="/private" element={<Private user={user} logout={logout} />} />
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
