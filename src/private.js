import netlifyIdentity from 'netlify-identity-widget';

import './app.css';

function Private() {
  const user = netlifyIdentity.currentUser();
  console.log('user', user);
  return (
    <div className="app private">Welcome</div>
  );
}

export default Private;
