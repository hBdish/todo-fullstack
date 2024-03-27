import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@data';

interface TableNavbar {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const TableNavbar = (props: TableNavbar) => {
  const { value, setValue } = props;
  const navigate = useNavigate();

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
      <BottomNavigationAction
        label="Вернуться"
        onClick={() => {
          navigate(ROUTES.Companies);
        }}
        icon={<ArrowBackIcon />}
      />
    </BottomNavigation>
  );
};

export { TableNavbar };
