import { useEffect, useState } from 'react';
import { LOCAL_API_BASE_PATH } from '../services/api/constants';
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
      fetch(`${LOCAL_API_BASE_PATH}${path}`, {
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
