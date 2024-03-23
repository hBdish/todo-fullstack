import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { useState } from 'react';

import { Company, Project, useStores } from '@services';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';

const Row = observer((props: { project: Project }) => {
  const { project } = props;

  const { projectStore } = useStores();
  const [open, setOpen] = useState(false);
  const onRowOpen = () => {
    setOpen(!open);
    void projectStore.getProjectData(project.id);
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={onRowOpen}>
            {open ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {project.name}
        </TableCell>
        <TableCell align="right">{project.type}</TableCell>
        <TableCell align="right">
          {format(project.createdAt, 'yyyy-MM-dd HH:mm')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Доска</TableCell>
                    {/*<TableCell align={'right'}>*/}
                    {/*  Дата последнего изменения*/}
                    {/*</TableCell>*/}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {projectStore.project?.table && (
                      <TableCell align={'left'}>
                        {projectStore.project?.table.name}
                      </TableCell>
                    )}
                  </TableRow>

                  {/*{row.map((projectsRow) => (*/}
                  {/*  <TableRow key={projectsRow.date}>*/}
                  {/*    <TableCell>{projectsRow.projectName}</TableCell>*/}

                  {/*    <TableCell align={'right'} component="th" scope="row">*/}
                  {/*      {projectsRow.date}*/}
                  {/*    </TableCell>*/}
                  {/*  </TableRow>*/}
                  {/*))}*/}
                </TableBody>
              </Table>
              <Button
                variant={'outlined'}
                onClick={() => {
                  console.log(project);
                }}
              >
                Редактировать
              </Button>
              <Button
                variant={'outlined'}
                color={'error'}
                onClick={() => {
                  console.log(project);
                }}
              >
                Удалить
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
});

interface CollapsibleTableProps {
  company?: Company;
}

function CollapsibleTable({ company }: CollapsibleTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Название&nbsp;проекта</TableCell>
            <TableCell align="right">Тип</TableCell>
            <TableCell align="right">Дата&nbsp;создания</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {company?.project.map((project) => (
            <Row key={project.id} project={project} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CollapsibleTable };
