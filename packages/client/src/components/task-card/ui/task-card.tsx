import { useDrag } from 'react-dnd';
import { Card, Typography } from '@mui/material';

import { classNames } from '@shared';

import { Task } from '@services';
import styles from './task-card.module.scss';

const TaskCard = (props: {
  task: Task;
  onClick?: () => void;
  className?: string;
}) => {
  const { task, onClick, className } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    item: {
      type: 'task',
      task,
    },
    type: 'task',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      variant={'outlined'}
      ref={drag}
      className={classNames(styles.taskCard, {}, [className])}
      onClick={onClick}
    >
      <Typography>{task.name}</Typography>
      <Typography>{task.description}</Typography>
    </Card>
  );
};

export { TaskCard };
