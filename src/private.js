import { useNavigate } from 'react-router-dom';

function Private({ user, logout }) {
  const navigate = useNavigate();

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
