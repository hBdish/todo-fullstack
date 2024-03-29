import { observer } from 'mobx-react-lite';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Card, Container, IconButton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useStores } from '@services';
import { stringAvatar } from '@shared';

const UsersList = observer(() => {
  const { companyStore, userStore } = useStores();

  return (
    <Container component="main" sx={{ width: 400 }}>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 1,
        }}
      >
        <Typography>Ссылка для приглашения</Typography>
        <IconButton
          onClick={() =>
            navigator.clipboard.writeText(
              `http://127.0.0.1:3000/add-user/${companyStore.company?.id}`,
            )
          }
        >
          <ContentCopyIcon />
        </IconButton>
      </Card>

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
            {(userStore.user.id === companyStore.company?.createdUseId ||
              userStore.user.id === user.id) && (
              <IconButton onClick={() => companyStore.patchUserCompany(user)}>
                <ExitToAppIcon />
              </IconButton>
            )}
          </Card>
        );
      })}
    </Container>
  );
});

export { UsersList };
