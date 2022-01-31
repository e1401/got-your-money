import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    isPending(true);

    //sign the user out
    try {
      await projectAuth.signOut();
      // dispatch logout action, payload is skipped because user is null
      dispatch({ type: 'LOGOUT' });
      setError(null);
      setIsPending(false);
    } catch (err) {
      isPending(false);
      setError(err.message);
      console.log(err.message);
    }
  };
  return { logout, error, isPending };
};
