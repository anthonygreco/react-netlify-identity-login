import { useLocation, useNavigate } from 'react-router-dom';

import './app.css';

function Login({ login }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const handleLogin = () => {
    login(() => {
      navigate(from.pathname);
    });
  };

  return (
    <div className="app public">
      <p>You must be authenticated to view this page.</p>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
