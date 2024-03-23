import { CSSProperties, FC } from 'react';

import { classNames } from '@shared';

import { TableProps, TableSubcomponents } from './types.ts';
import {
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from './components';

import styles from './coomon-style.module.scss';

const Table: FC<TableProps> & TableSubcomponents = (props: TableProps) => {
  const {
    className,
    columnWidths,
    children,
    customStyle = 'style_tasks',
  } = props;
  const style: CSSProperties = { gridTemplateColumns: columnWidths.join(' ') };

  return (
    <div
      className={classNames(styles.table, {}, [className, styles[customStyle]])}
      style={style}
    >
      {children}
    </div>
  );
};

Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.HeaderCell = TableHeaderCell;

export { Table };
