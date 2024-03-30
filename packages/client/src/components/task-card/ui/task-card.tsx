import { useDrag } from 'react-dnd';
import { Card, Typography } from '@mui/material';

import { classNames } from '@shared';

import { Task } from '@services';
import styles from './task-card.module.scss';
import { UserSelect } from '../../user-select';

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
    >
      <UserSelect
        className={styles.userSelect}
        activeUser={task.user}
        activeTask={task}
      />
      <div className={styles.content} onClick={onClick}>
        <Typography className={styles.name}>{task.name}</Typography>
        <Typography className={styles.description}>
          {task.description}
        </Typography>
      </div>
    </Card>
  );
};

export { TaskCard };
