import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { Project, useStores } from '@services';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

interface UpdateProjectModal {
  project: Project;
  open: boolean;
  handleClose: () => void;
}

const UpdateProjectModal = observer((props: UpdateProjectModal) => {
  const { open = false, handleClose, project } = props;
  const { companyStore, projectStore } = useStores();
  const [name, setName] = useState(project.name);
  const [type, setType] = useState(project.type);
  const [photo, setPhoto] = useState(project.photo);

  const onCreateHandle = () => {
    projectStore.setProjectForm('companyId', companyStore.company?.id || '');

    const updatedProject: Project = {
      ...project,
      name,
      type,
      photo,
    };

    void projectStore.patchProject(updatedProject);

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
          Редактирование проекта
        </Typography>
        <TextField
          onChange={({ target }) => {
            setName(target.value);
          }}
          value={name}
          id="standard-basic"
          label="Название"
          variant="standard"
        />
        <TextField
          onChange={({ target }) => {
            setType(target.value);
          }}
          value={type}
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
                setPhoto(reader.result as string);
              };
              reader.readAsDataURL(img);
            }
          }}
          type={'file'}
          accept={'image/png, image/jpeg'}
        />
        <Button onClick={onCreateHandle}>Обновить проект</Button>
      </Box>
    </Modal>
  );
});

export { UpdateProjectModal };
