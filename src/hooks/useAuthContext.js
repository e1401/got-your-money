// import { AuthContext } from '../context/AuthContext';
// import { useContext } from 'react';

// export const useAuthContext = () => {
//   //first consume the context which is {...state, dispatch} object
//   const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuthContext must be inside AuthContextProvider')
//     }
//   return context
// };

import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return context;
};
