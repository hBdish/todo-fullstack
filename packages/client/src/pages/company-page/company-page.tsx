import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  Drawer,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useStores } from '@services';
import { useEffect, useState } from 'react';
import { ProjectsTable } from './components';
import { CreateProjectModal } from '@components';
import { UsersList } from '../../components/users/users-list.tsx';

import { ROUTES, setAccessKey, setRefreshKey } from '@data';

import { useNavigate } from 'react-router-dom';

const CompanyPage = observer(() => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const navigate = useNavigate();

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
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <BottomNavigation
        sx={{
          width: 80,
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        showLabels
      >
        <BottomNavigationAction
          onClick={() => {
            setShowCreateModal(true);
          }}
          label="Создать задачу"
          icon={<AddIcon />}
        />
        <BottomNavigationAction
          onClick={() => {
            setShowUsers(true);
          }}
          label="Участники"
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
          label="Выйти"
          onClick={() => {
            setRefreshKey('');
            setAccessKey('');
            navigate(ROUTES.SignIn);
          }}
          icon={<ExitToAppIcon />}
        />
      </BottomNavigation>
      <Container component="main" maxWidth="xl">
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
    </Box>
  );
});

export { CompanyPage };
