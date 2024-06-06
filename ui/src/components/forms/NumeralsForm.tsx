import { IRegister } from 'types/register';

export const NumeralsForm: IRegister = {
  id: 1,
  name: 'Datos del Plantel',
  questions: [
    {
      id: 1,
      question: 'Subsistema',
      name: 'subsystem',
      required: true,
      editable: true,
      type: 'input',
    },
    {
      id: 2,
      question: 'Respuestas Estimadas',
      name: 'estimatedAnswers',
      editable: true,
      required: true,
      type: 'input',
      validation_rules: [
        {
          validator: (_, value) => {
            if (!isNaN(value) && parseInt(value) == parseFloat(value)) {
              return Promise.resolve();
            }
            return Promise.reject('Este campo solo permite números enteros');
          },
        },
      ],
    },
  ],
};
