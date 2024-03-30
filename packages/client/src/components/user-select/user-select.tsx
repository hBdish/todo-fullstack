import {
  Avatar,
  Box,
  Card,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { stringAvatar } from '@shared';
import { observer } from 'mobx-react-lite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Task, useStores } from '@services';

import { User } from '../../services/user';

interface UserSelect {
  activeUser: User | null;
  activeTask: Task;
  className?: string;
}

const UserSelect = observer((props: UserSelect) => {
  const { activeUser, activeTask, className } = props;
  const {
    companyStore,
    userStore: { user },
    taskStore,
  } = useStores();
  const [activeUserState, setActiveUser] = useState(activeUser);

  useEffect(() => {
    void companyStore.getCompanyData(user.company.id);
  }, []);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onUserChange = (user: User) => {
    void taskStore.updateTask({ ...activeTask, user: user });
    setActiveUser(user);
    handleClose();
  };

  return (
    <Box className={className}>
      {activeUserState ? (
        <IconButton onClick={handleClick} aria-describedby={id}>
          {user.photo ? (
            <Avatar alt={'user-avatar'} src={activeUserState.photo} />
          ) : (
            <Avatar {...stringAvatar(activeUserState.name)} />
          )}
        </IconButton>
      ) : (
        <IconButton onClick={handleClick} aria-describedby={id}>
          <AccountCircleIcon fontSize={'large'} />
        </IconButton>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack spacing={1}>
          {companyStore.users.map((user) => {
            return (
              <div
                onClick={() => {
                  onUserChange(user);
                }}
                key={user.id}
              >
                <Card
                  sx={{
                    display: 'flex',
                    gap: 1,
                    minWidth: 180,
                    padding: 1,
                    cursor: 'pointer',
                  }}
                >
                  {user.photo ? (
                    <Avatar alt={'user-avatar'} src={user.photo} />
                  ) : (
                    <Avatar {...stringAvatar(user.name)} />
                  )}
                  <Typography>{user.name}</Typography>{' '}
                </Card>
              </div>
            );
          })}
        </Stack>
      </Popover>
    </Box>
  );
});

export { UserSelect };
