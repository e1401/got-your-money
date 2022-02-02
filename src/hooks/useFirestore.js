//Purpose of this hook: add and remove documents from a Firestore collection

import { useState, useEffect, useReducer } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING': {
      return { isPending: true, document: null, success: false, error: null };
    }
    case 'ADDED_DOCUMENT': {
      return { isPending: false, document: action.payload, success: true, error: null };
    }
    case 'ERROR': {
      return { isPending: false, document: null, success: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  //if the page is reloaded or switched then isCanceled = true, and no state is updated
  const [isCanceled, setIsCanceled] = useState(false);

  //a reference to a collection in the database
  const ref = projectFirestore.collection(collection);

  //dispatch only if !isCanceled
  const dispatchIfNotCanceled = (action) => {
    if (!isCanceled) {
      dispatch(action);
    }
  };
  //add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCanceled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };
  //delete a document
  const deleteDocument = async (id) => {};

  //clean-up function via useEffect
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
