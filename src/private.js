import { useNavigate } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';

import './app.css';

function Private({ logout }) {
  const navigate = useNavigate();
  const user = netlifyIdentity.currentUser();

  const handleLogout = () => {
    logout(() => {
      navigate('/');
    });
  };

  return (
    <div className="app private">
      <p>Welcome {user.user_metadata.full_name}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Private;
