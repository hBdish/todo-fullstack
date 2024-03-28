import { Button, Container, CssBaseline, Drawer, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useStores } from '@services';
import { useEffect, useState } from 'react';
import { ProjectsTable } from './components';
import { CreateProjectModal } from '@components';
import { UsersList } from '../../components/users/users-list.tsx';

const CompanyPage = observer(() => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

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
    <>
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
        <Button
          onClick={() => {
            setShowUsers(true);
          }}
          sx={{ display: 'grid', width: '100%', justifyContent: 'center' }}
        >
          Управление пользователями
        </Button>

        <CreateProjectModal
          open={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
        />
        <ProjectsTable projects={companyStore.company?.project || []} />
      </Container>
      <Drawer
        anchor={'right'}
        open={showUsers}
        onClose={() => setShowUsers(false)}
      >
        <UsersList />
      </Drawer>
    </>
  );
});

export { CompanyPage };
