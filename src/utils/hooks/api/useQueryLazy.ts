import { useCallback, useState } from 'react';

export const useQueryLazy = <K>(request: () => Promise<any>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const query = useCallback(async (): Promise<K | undefined> => {
    setIsLoading(true);
    try {
      return await request().then(async (response) => response);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { query, error, isLoading };
};
