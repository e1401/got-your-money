import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  //infinite loop alert if you don't useRef
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        //update the state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError('Could not fetch data');
      }
    );
    //unsubscribe from real-time listener on component unmount
    return () => unsubscribe();
  }, [collection, query, orderBy]);
  return { documents, error };
};
