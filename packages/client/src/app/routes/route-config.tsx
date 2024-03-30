import { ROUTES } from '@data';
import { Navigate, RouteProps } from 'react-router-dom';
import {
  AddUserToCompanyPage,
  AuthPage,
  CompanyPage,
  RegPage,
  TablePage,
} from '@pages';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};

export const routeConfig: Record<keyof typeof ROUTES, AppRoutesProps> = {
  SignIn: {
    path: ROUTES.SignIn,
    element: <AuthPage />,
  },
  Registration: {
    path: ROUTES.Registration,
    element: <RegPage />,
  },
  AddUser: {
    path: ROUTES.AddUser,
    element: <AddUserToCompanyPage />,
  },
  Companies: {
    path: ROUTES.Companies,
    element: <CompanyPage />,
    authOnly: true,
  },
  Table: {
    path: ROUTES.Table,
    element: <TablePage />,
    authOnly: true,
  },
  Index: {
    path: ROUTES.Index,
    element: <Navigate to={ROUTES.SignIn}></Navigate>,
  },
};
