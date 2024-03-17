import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps, routeConfig } from './route-config.tsx';
import { RequireAuth } from './require-auth.tsx';

const AppRouter = memo(() => {
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

  return <Routes>{Object.values(routeConfig).map(renderWrapper)}</Routes>;
});

export { AppRouter };
