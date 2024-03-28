import { Button, Container, CssBaseline, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useStores } from '@services';
import { useEffect, useState } from 'react';
import { ProjectsTable } from './components';
import { CreateProjectModal } from '@components';

const CompanyPage = observer(() => {
  const [showCreateModal, setShowCreateModal] = useState(false);
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

      <Button
        onClick={() => {
          setShowCreateModal(true);
        }}
        sx={{ display: 'grid', width: '100%', justifyContent: 'center' }}
      >
        Создать проект
      </Button>

      <CreateProjectModal
        open={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
      />
      <ProjectsTable projects={companyStore.company?.project || []} />
    </Container>
  );
});

export { CompanyPage };
