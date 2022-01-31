// import { useState } from 'react';
// import { projectAuth } from '../firebase/config';
// import { useAuthContext } from './useAuthContext';

// export const useSignup = () => {
//   const [error, setError] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const { dispatch } = useAuthContext();

//   const signup = async (email, password, displayName) => {
//     setError(null);
//     setIsPending(true);

//     try {
//       // signup
//       const res = await projectAuth.createUserWithEmailAndPassword(email, password);

//       if (!res) {
//         throw new Error('Could not complete signup');
//       }

//       // add display name to user
//       await res.user.updateProfile({ displayName });

//       // dispatch login action
//       dispatch({ type: 'LOGIN', payload: res.user });

//       setIsPending(false);
//       setError(null);
//     } catch (err) {
//       console.log(err.message);
//       setError(err.message);
//       setIsPending(false);
//     }
//   };

//   return { signup, error, isPending };
// };

import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
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
