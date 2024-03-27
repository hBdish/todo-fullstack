import { observer } from 'mobx-react-lite';
import {
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useStores } from '@services';

const Tasks = observer(() => {
  const { tableStore, taskStore } = useStores();

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {taskStore.tasks.map((task) => (
        <ListItem
          key={task.id}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <MoreHorizIcon />
            </IconButton>
          }
        >
          <ListItemText primary={task.name} />

          <FormControl>
            <InputLabel id="select_id">Статус</InputLabel>
            <Select
              labelId="select_id"
              value={task.status || ''}
              label="Статус"
              onChange={({ target }) => {
                void taskStore.updateTask({
                  ...task,
                  status: target.value,
                });
              }}
            >
              {tableStore.activeTable?.workflow.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
      ))}
    </List>
  );
});

export { Tasks };
