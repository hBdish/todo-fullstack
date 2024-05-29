import {
  AppBar,
  Dialog,
  IconButton,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, ReactElement, Ref, useEffect } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { observer } from 'mobx-react-lite';
import { Task, useStores } from '@services';

function createData(
  name: string,
  wait: number,
  inWork: number,
  done: number,
  imposible: number,
) {
  return { name, wait, inWork, done, imposible };
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SprintInfoModal = observer(
  ({
    isOpen = false,
    handleClose,
    tasks,
  }: {
    isOpen: boolean;
    handleClose: () => void;
    handleClickAgree?: () => void;
    tasks: Task[];
  }) => {
    const { taskStore } = useStores();

    useEffect(() => {
      void taskStore.closeSprint(tasks);
    }, [isOpen]);

    const rows = taskStore.sprintInfo.map((info) =>
      createData(info.name, info.wait, info.inWork, info.done, info.imposible),
    );

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Информация о спринте
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Пользователь</TableCell>
                <TableCell align="right">Не начаты</TableCell>
                <TableCell align="right">В работе</TableCell>
                <TableCell align="right">Выполнены</TableCell>
                <TableCell align="right">Невозможно выполнить</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.wait}</TableCell>
                  <TableCell align="right">{row.inWork}</TableCell>
                  <TableCell align="right">{row.done}</TableCell>
                  <TableCell align="right">{row.imposible}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    );
  },
);

export { SprintInfoModal };
