import { useState } from 'react';
import { useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
      const response = await projectAuth.signInWithEmailAndPassword(email, password);
      // dispatch logout action, payload is skipped because user is null
      dispatch({ type: 'LOGIN', payload: response.user });

      //update state
      if (!isCanceled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCanceled) {
        setIsPending(false);
        setError(err.message);
        console.log(err.message);
      }
    }
  };
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);
  return { login, error, isPending };
};
