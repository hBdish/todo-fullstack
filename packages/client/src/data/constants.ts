const ROUTES = {
  Index: '/',
  SignIn: '/sign-in',
  Registration: '/registration',
  Companies: '/companies',
  Table: '/table/:id',
};

const routeToTableId = (id: string) => {
  return `/table/${id}`;
};

export { ROUTES, routeToTableId };
