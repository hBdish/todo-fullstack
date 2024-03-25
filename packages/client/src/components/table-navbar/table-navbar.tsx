import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Dispatch, SetStateAction, useState } from 'react';

interface TableNavbar {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const TableNavbar = (props: TableNavbar) => {
  const { value, setValue } = props;

  return (
    <BottomNavigation
      sx={{
        width: 80,
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Доска" icon={<TableChartIcon />} />
      <BottomNavigationAction label="Задачи" icon={<AssignmentIcon />} />
    </BottomNavigation>
  );
};

export { TableNavbar };
