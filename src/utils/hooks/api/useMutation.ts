import { useCallback, useState } from 'react';

export const useMutation = <T, K>(request: (body: T) => Promise<K>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<K | null>(null);

  const mutation = useCallback((body: T): void => {
    setIsLoading(true);
    try {
      request(body).then((response) => {
        setIsLoading(false);
        setData(response);
      });
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  }, []);

  const mutationAsync = useCallback(async (body: T): Promise<K | undefined> => {
    setIsLoading(true);
    try {
      return await request(body);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutation, mutationAsync, data, error, isLoading };
};
