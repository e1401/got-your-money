import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      //signup user
      const response = await projectAuth.createUserWithEmailAndPassword(email, password);
      console.log(response.user);

      if (!response) {
        throw new Error('Could not complete sign-up');
      }
      // add display name to user, argument is an object so {dispayName: displayName} or, simply {displayName}
      await response.user.updateProfile({ displayName });
      setError(null);
      setIsPending(false);
    } catch (err) {
      //error
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
