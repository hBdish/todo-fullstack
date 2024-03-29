import { Box, Modal, TextField } from '@mui/material';
import { Task, useStores } from '@services';
import { UserSelect } from '../user-select';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

interface TaskInfoCard {
  open: boolean;
  handleClose: () => void;
  task: Task;
}

const TaskInfoCard = observer((props: TaskInfoCard) => {
  const { open, handleClose, task } = props;
  const { taskStore } = useStores();

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const onBlurUpdate = () => {
    void taskStore.updateTask({ ...task, name, description });
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
          width: 680,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          id="filled-basic"
          label="Имя задачи"
          variant="filled"
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          onBlur={onBlurUpdate}
        />

        <TextField
          id="filled-basic"
          label="Описание"
          variant="filled"
          value={description}
          onChange={({ target }) => {
            setDescription(target.value);
          }}
          onBlur={onBlurUpdate}
          multiline
          maxRows={8}
        />

        <UserSelect activeUser={task.user} activeTask={task} />
      </Box>
    </Modal>
  );
});

export { TaskInfoCard };
