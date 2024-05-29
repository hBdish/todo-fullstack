import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const CloseSprintDialog = ({
  isOpen = false,
  handleClickAgree,
  handleClose,
}: {
  isOpen: boolean;
  handleClickAgree: () => void;
  handleClose: () => void;
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Вы уверены, что хотите завершить спринт?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Незавершенные задачи будут перенесены в следующий спринт
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant={'outlined'} onClick={handleClose}>
          Отмена
        </Button>
        <Button variant={'outlined'} onClick={handleClickAgree} autoFocus>
          Завершить спринт
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { CloseSprintDialog };
