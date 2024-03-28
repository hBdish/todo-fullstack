import { User } from '../../services/user';
import { Card, IconButton, MenuItem, Select } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface UserSelect {
  activeUser: User | null;
  users: User[];
}

const UserSelect = (props: UserSelect) => {
  const { activeUser, users } = props;

  console.log(activeUser);

  return (
    <Card sx={{ width: 40 }}>
      {!activeUser ? (
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      ) : (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activeUser}
          label="Исполнителя"
          open={true}
          onChange={(event) => {}}
        >
          {users.map((user) => {
            return <MenuItem value={user.id}>{user.name}</MenuItem>;
          })}
        </Select>
      )}
    </Card>
  );
};

export { UserSelect };
