import { useState, useEffect } from 'react';

interface State<T> {
  pending: boolean;
  data?: T;
  error?: string;
}

const useFetch = <T extends unknown>(url: string, options?: any): State<T> => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const {
      signal: { aborted }
    } = abortController;

    const doFetch = async () => {
      setPending(true);

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
          setPending(false);
        }
      }
    };
    doFetch();
  }, [url, options]);

  return { data, error, pending };
};

export default useFetch;
