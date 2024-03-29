import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useStores } from '@services';

interface CreateProjectModal {
  open: boolean;
  handleClose: () => void;
}

const CreateProjectModal = (props: CreateProjectModal) => {
  const { open = false, handleClose } = props;
  const { companyStore, projectStore } = useStores();

  const onCreateHandle = () => {
    projectStore.setProjectForm('companyId', companyStore.company?.id || '');

    void projectStore.postProject();

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
          gap: '12px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <Typography
          textAlign={'center'}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Новый проект
        </Typography>
        <TextField
          onChange={({ target }) => {
            projectStore.setProjectForm('name', target.value);
          }}
          id="standard-basic"
          label="Название"
          variant="standard"
        />
        <TextField
          onChange={({ target }) => {
            projectStore.setProjectForm('type', target.value);
          }}
          id="standard-basic"
          label="Тип проекта"
          variant="standard"
        />
        <input
          onChange={({ target }) => {
            if (target.files) {
              const img = target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                projectStore.setProjectForm('photo', reader.result as string);
              };
              reader.readAsDataURL(img);
            }
          }}
          type={'file'}
          accept={'image/png, image/jpeg'}
        />
        <Button variant={'outlined'} onClick={onCreateHandle}>
          Создать проект
        </Button>
      </Box>
    </Modal>
  );
};

export { CreateProjectModal };
