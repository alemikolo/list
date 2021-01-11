import { useState, useEffect } from 'react';

interface State<T> {
  loading: boolean;
  data?: T;
  error?: string;
}

const useFetch = <T extends unknown>(url: string, options?: any): State<T> => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const {
      signal: { aborted }
    } = abortController;

    const doFetch = async () => {
      setLoading(true);

      const fetchOptions = options
        ? options
        : { credentials: 'include', method: 'POST' };

      try {
        const response = await fetch(url, fetchOptions);

        if (response.ok) {
          const json = await response.json();

          if (!aborted) {
            setData(json);
          }
        }
      } catch (error) {
        if (!aborted) setError(error);
      } finally {
        if (!aborted) {
          setLoading(false);
        }
      }
    };

    doFetch();
  }, [url, options]);

  return { data, error, loading };
};

export default useFetch;
