// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './app.css';

function Login({ auth }) {
  // const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  // const navigate = useNavigate();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  // useEffect(() => {
  //   navigate(from);
  // }, [redirectToReferrer]);

  const handleLogin = () => {
    auth.authenticate(() => {
      console.log('AUTH OK!', from);
      // setRedirectToReferrer(true);
    });
  };

  return (
    <div className="app public">
      <p>You must be authenticated to view this page.</p>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}

export default Login;
