import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useStores } from '@services';
import { ROUTES } from '@data';
import { observer } from 'mobx-react-lite';

const RequireAuth = observer(({ children }: { children: ReactNode }) => {
  const {
    loginStore: { auth },
  } = useStores();
  const location = useLocation();

  if (!auth) {
    return <Navigate to={ROUTES.SignIn} state={{ from: location }} replace />;
  }

  return children;
});

export { RequireAuth };
