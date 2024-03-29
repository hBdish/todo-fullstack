import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps, routeConfig } from './route-config.tsx';
import { RequireAuth } from './require-auth.tsx';
import { useAppInitialize } from '@hooks';

const AppRouter = memo(() => {
  const { pending } = useAppInitialize();

  const renderWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<>Loading...</>}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  if (pending) return <></>;

  return <Routes>{Object.values(routeConfig).map(renderWrapper)}</Routes>;
});

export { AppRouter };
