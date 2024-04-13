import React from 'react';
import { useHistory } from 'react-router-dom';

const SignOut: React.FC = () => {
  const history = useHistory();

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
