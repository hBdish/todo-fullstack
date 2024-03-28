const ROUTES = {
  Index: '/',
  SignIn: '/sign-in',
  AddUser: '/add-user/:id',
  Registration: '/registration',
  Companies: '/companies',
  Table: '/table/:id',
};

const routeToTableId = (id: string) => {
  return `/table/${id}`;
};

export { ROUTES, routeToTableId };
