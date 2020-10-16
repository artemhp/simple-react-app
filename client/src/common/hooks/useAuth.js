import { useState, useEffect, useCallback } from 'react';
import postLogin from '../api/postLogin';
import useFetch from '../hooks/useFetch';

export default function useAuth(serverRequest) {
  const [token, setToken] = useState(null);
  const { status, isLoading, send, data } = useFetch(postLogin);
  useEffect(() => {
    if (data) {
      setToken(data.access_token);
    }
  }, [data]);

  const onLogin = (credentials) => {
    return send(credentials);
  }
  return {
    token,
    status,
    isLoading,
    onLogin,
  };
}
