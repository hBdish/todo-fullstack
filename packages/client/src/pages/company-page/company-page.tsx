import { Container, CssBaseline } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useStores } from '@services';
import { useEffect } from 'react';
import { ProjectsTable } from './components';

const CompanyPage = observer(() => {
  const {
    companyStore,
    userStore: { user },
  } = useStores();

  useEffect(() => {
    void companyStore.getCompanyData(user.company.id);
  }, [user]);

  if (companyStore.isLoading) {
    return <>Loading</>;
  }

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <ProjectsTable projects={companyStore.company?.project || []} />
    </Container>
  );
});

export { CompanyPage };
