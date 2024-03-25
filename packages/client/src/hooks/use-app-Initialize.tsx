import { useCallback, useEffect, useState } from 'react';
import { useStores } from '@services';

const useAppInitialize = () => {
  const [pending, setPending] = useState(true);
  const { loginStore } = useStores();

  const initialize = useCallback(() => {
    loginStore.refresh().then(() => {
      setPending(false);
    });
  }, [loginStore]);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return { pending };
};

export { useAppInitialize };
