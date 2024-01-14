import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet
} from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';

import Public from './public';
import Private from './private';

import './app.css';
import React from 'react';

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

const PrivateRoute = () => netlifyAuth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Public />} />
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
