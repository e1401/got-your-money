import { useState } from 'react';
import { useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      //signup user
      const response = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!response) {
        throw new Error('Could not complete sign-up');
      }
      // add display name to user, argument is an object so {dispayName: displayName} or, simply {displayName}
      await response.user.updateProfile({ displayName });

      //dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user });

      //update the state
      if (!isCanceled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      //error
      if (!isCanceled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  });

  return { error, isPending, signup };
};
