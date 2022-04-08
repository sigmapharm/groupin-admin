import { useEffect, useState } from 'react';
import Auth from '../services/security/AccessTokenStorage';

export function useFecth(path, options) {
  // setdata
  const [data, setData] = useState(null);
  // set IS Loading
  const [isLoading, setIsLoading] = useState(false);
  // set Error
  const [error, setError] = useState(null);

  useEffect(
    () => {
      fetch(`http://192.168.11.104:8080${path}`, {
        ...options,
        headers: {
          Authorization: Auth.get(),
        },
      })
        .then(response => response.json())
        .then(setData)
        .catch(setError)
        .finally(() => setIsLoading(false));
    },

    [path],
  );

  return { error, isLoading, data };
}
