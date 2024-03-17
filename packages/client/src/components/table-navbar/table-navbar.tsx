import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const TableNavbar = () => {
  return (
    <Box sx={{ width: 160, height: '100vh' }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={'Доска'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={'Задачи'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export { TableNavbar };
