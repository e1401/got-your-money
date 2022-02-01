import { useState } from 'react';
import { useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
      await projectAuth.signOut();
      // dispatch logout action, payload is skipped because user is null
      dispatch({ type: 'LOGOUT' });

      //update state
      if (!isCanceled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCanceled) {
        isPending(false);
        setError(err.message);
        console.log(err.message);
      }
    }
  };
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);
  return { logout, error, isPending };
};
