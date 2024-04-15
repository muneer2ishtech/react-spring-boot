import React from 'react';
import { createBrowserHistory } from 'history';

const SignOut: React.FC = () => {
  const history = createBrowserHistory();

  const handleSignOut = () => {
    // Perform logout logic here (e.g., clearing authentication tokens, etc.)
    // Redirect to desired page after sign out
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
