import { observer } from 'mobx-react-lite';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Card, Container, IconButton, Typography } from '@mui/material';

import { useStores } from '@services';
import { stringAvatar } from '@shared';

const UsersList = observer(() => {
  const { companyStore } = useStores();

  return (
    <Container component="main" sx={{ width: 400 }}>
      {companyStore.users.map((user) => {
        return (
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: 1,
              margin: 1,
            }}
          >
            {user.photo ? (
              <Avatar alt={'avatar'} src={user.photo} />
            ) : (
              <Avatar {...stringAvatar(user.name)} />
            )}
            <Typography>{user.name}</Typography>
            <IconButton onClick={() => companyStore.patchUserCompany(user)}>
              <ExitToAppIcon />
            </IconButton>
          </Card>
        );
      })}
    </Container>
  );
});

export { UsersList };
