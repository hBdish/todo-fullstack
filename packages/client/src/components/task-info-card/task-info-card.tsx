import { Box, Modal, TextField, Typography } from '@mui/material';
import { Task, useStores } from '@services';
import { UserSelect } from '../user-select';
import { observer } from 'mobx-react-lite';

interface TaskInfoCard {
  open: boolean;
  handleClose: () => void;
  task: Task;
}

const TaskInfoCard = observer((props: TaskInfoCard) => {
  const { open, handleClose, task } = props;
  const { companyStore } = useStores();

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
          label="Имя"
          variant="filled"
          value={task.name}
        />

        <TextField
          id="filled-basic"
          label="Описание"
          variant="filled"
          value={task.description}
          multiline
          maxRows={8}
        />

        <UserSelect activeUser={task.user} users={companyStore.users} />
      </Box>
    </Modal>
  );
});

export { TaskInfoCard };
