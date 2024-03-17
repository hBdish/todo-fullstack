import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { useState } from 'react';

function createData(name: string, tasksSize: number, peopleSize: number) {
  return {
    name,
    tasksSize,
    peopleSize,

    projects: [
      {
        date: '2024-03-05',
        projectName: 'Project 1',
      },
      {
        date: '2020-03-07',
        projectName: 'Project 2',
      },
    ],
  };
}

const Row = (props: { row: ReturnType<typeof createData> }) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.peopleSize}</TableCell>
        <TableCell align="right">{row.tasksSize}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Projects
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell align={'right'}>
                      Дата последнего изменения
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.projects.map((projectsRow) => (
                    <TableRow key={projectsRow.date}>
                      <TableCell>{projectsRow.projectName}</TableCell>

                      <TableCell align={'right'} component="th" scope="row">
                        {projectsRow.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const rows = [createData('Company 1', 19, 6), createData('Company 2', 13, 9)];

function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Название&nbsp;компании</TableCell>
            <TableCell align="right">Количество&nbsp;участников</TableCell>
            <TableCell align="right">Всего&nbsp;задач</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CollapsibleTable };
