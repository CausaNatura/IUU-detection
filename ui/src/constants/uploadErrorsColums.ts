import { ColumnGroupType, ColumnType } from 'antd/es/table';

export const errorColumns: (ColumnGroupType<object> | ColumnType<object>)[] = [
  {
    title: 'Nombre completo',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Error',
    dataIndex: 'error',
    key: 'error',
  },
];
