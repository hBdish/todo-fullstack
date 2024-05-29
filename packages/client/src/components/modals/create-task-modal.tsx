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
import { DatePicker } from '@mui/x-date-pickers';

interface CreateTaskModal {
  open: boolean;
  handleClose: () => void;
}

const CreateTaskModal = observer((props: CreateTaskModal) => {
  const { open, handleClose } = props;
  const { projectStore, tableStore, taskStore } = useStores();
  const workflow = tableStore.activeTable?.workflow || [];
  const [task, setTask] = useState<{
    name: string;
    description: string;
    status: string;
  }>({
    name: '',
    description: '',
    status: workflow?.[0] || '',
  });

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
          display: 'grid',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          gap: 1,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Новая задача
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
          multiline
          maxRows={8}
          id="create-task-desc"
          label="Описание задачи"
          variant="standard"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DatePicker sx={{ width: 240 }} label={'Дата начала исполнения'} />
          <DatePicker sx={{ width: 240 }} label={'Дата завершения'} />
        </Box>

        <Select
          sx={{
            width: 200,
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={task.status}
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
