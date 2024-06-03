import { IRegister } from 'types/register';

export const UserForm: IRegister = {
  id: 1,
  name: 'Datos del Alumno',
  questions: [
    {
      id: 1,
      question: 'Nombre',
      name: 'name',
      editable: true,
      required: true,
      type: 'input',
    },
    {
      id: 2,
      question: 'Apellidos',
      name: 'lastName',
      required: true,
      editable: true,
      type: 'input',
    },
    {
      id: 3,
      question: 'Correo',
      name: 'email',
      required: true,
      editable: true,
      type: 'input',
      validation_rules: [
        {
          type: 'email',
          message: 'Por favor ingresa un email valido',
        },
      ],
    },
  ],
};
