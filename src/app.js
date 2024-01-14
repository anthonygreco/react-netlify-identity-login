import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  useLocation,
  Navigate
} from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';

import Public from './public';
import Private from './private';
import Login from './login';

import './app.css';

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', user => {
      this.user = user;
      callback(user);
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.user = null;
      callback();
    });
  }
};

const PrivateRoute = () => {
  const location = useLocation();
  return netlifyAuth.isAuthenticated ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Public />} />
      <Route path="/login" element={<Login auth={netlifyAuth} />} />
      <Route path="/private" element={<PrivateRoute />}>
        <Route path="/private" element={<Private />} />
      </Route>
    </Route>
  )
);

function App() {
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
