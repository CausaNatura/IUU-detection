import { ColumnsType } from 'antd/es/table';
import { IAnswerQuestion } from 'types/answer';
import { Student } from 'types/student';

export const studentDataColumns: ColumnsType<Student> = [
  {
    title: 'CURP',
    dataIndex: 'curp',
  },
  {
    title: 'Nombre completo',
    dataIndex: 'name',
  },
  {
    title: 'Grado',
    dataIndex: 'year',
  },
  {
    title: 'Turno',
    dataIndex: 'schedule',
  },
  {
    title: 'CCT',
    dataIndex: 'cct',
  },
  {
    title: 'Plantel',
    dataIndex: 'school',
  },
  {
    title: 'Subsistema',
    dataIndex: 'subsystem',
  },
];

export const answerColumns: ColumnsType<IAnswerQuestion> = [
  {
    title: 'Pregunta',
    dataIndex: 'name',
  },
  {
    title: 'Respuesta',
    dataIndex: 'answer',
  },
];
