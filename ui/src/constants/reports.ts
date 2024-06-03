import { ReportRequest } from 'types/report';

export const reportRequestsSliceInitialState: ReportRequest[] = [
  {
    _id: '',
    fileName: '',
    reportType: '',
    user: '',
    year: '',
    reportStatus: '',
    errorDescription: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const yearSelectOptions = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];
export const reportTypesOptions = [
  {
    label: 'Corto completo',
    value: 'corto completo',
  },
  {
    label: 'Corto',
    value: 'corto',
  },
  {
    label: 'Diagnóstico',
    value: 'diagnóstico',
  },
];
