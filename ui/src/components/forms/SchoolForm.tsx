import { IRegister } from 'types/register';

export const SchoolForm: IRegister = {
  id: 1,
  name: 'Datos del Plantel',
  questions: [
    {
      id: 1,
      question: 'Entidad Federativa',
      name: 'state',
      required: true,
      editable: true,
      type: 'input',
    },
    {
      id: 2,
      question: 'Municipio',
      name: 'municipality',
      editable: true,
      required: true,
      type: 'input',
    },
    {
      id: 3,
      question: 'CCT',
      name: 'cct',
      editable: true,
      required: true,
      type: 'input',
    },
    {
      id: 4,
      question: 'Nombre',
      name: 'name',
      editable: true,
      required: true,
      type: 'input',
    },
    {
      id: 5,
      question: 'Subsistema',
      name: 'subsystem',
      editable: true,
      required: true,
      type: 'input',
    },
  ],
};
