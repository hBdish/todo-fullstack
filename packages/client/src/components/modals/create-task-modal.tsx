import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Project, Table, useStores } from '@services';
import { useEffect, useState } from 'react';

interface CreateTaskModal {
  open: boolean;
  handleClose: () => void;
}

const CreateTaskModal = observer((props: CreateTaskModal) => {
  const { open, handleClose } = props;
  const { projectStore, tableStore, taskStore } = useStores();
  const [task, setTask] = useState<{
    name: string;
    description: string;
    status: string;
  }>({
    name: '',
    description: '',
    status: '',
  });

  const workflow = tableStore.activeTable?.workflow || [];

  useEffect(() => {
    taskStore.setCreateTaskData('project', projectStore.project as Project);
    taskStore.setCreateTaskData('table', tableStore.activeTable as Table);
  }, []);

  const onCreateHandle = () => {
    taskStore.setCreateTaskData('task', task);

    void taskStore.postTask();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Новый проект
        </Typography>
        <TextField
          onChange={({ target }) => {
            setTask((task) => ({ ...task, name: target.value }));
          }}
          id="standard-basic"
          label="Имя задачи"
          variant="standard"
        />
        <TextField
          onChange={({ target }) => {
            setTask((task) => ({ ...task, description: target.value }));
          }}
          id="create-task-desc"
          label="Тип проекта"
          variant="standard"
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={workflow?.[0] || ''}
          label="Статус"
          onChange={({ target }) => {
            setTask((task) => ({ ...task, status: target.value }));
          }}
        >
          {workflow.map((status) => {
            return <MenuItem value={status}>{status}</MenuItem>;
          })}
        </Select>

        <Button onClick={onCreateHandle}>Создать задачу</Button>
      </Box>
    </Modal>
  );
});

export { CreateTaskModal };
