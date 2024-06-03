export const strings = {
  loginError: 'Error al iniciar sesión.',
  serverError:
    'Lo sentimos, algo salió mal en el servidor. Por favor, inténtalo de nuevo más tarde.',
  passwordRulesMessage:
    'La contraseña debe tener entre 6 y 16 caracteres y debe incluir al menos una letra mayúscula, al menos un número y al menos uno de los siguientes símbolos: .!@#$%^&*',
  setPasswordErrorMsg: 'Ocurrió un error al guardar la contraseña',
  searchStudentError: 'Error al buscar alumno',
};

export const defaultErrorStrings = {
  notFound: 'El registro no existe',
  badFormat: 'Los datos enviados están incorrectos o incompletos',
  timesOver:
    'Lo sentimos, pero el tiempo se ha terminado, las preguntas que ya has respondido se enviaran',
};

export const errorStrings = {
  student: {
    search: 'Este alumno no está registrado',
    curpSearch: 'No se encontró ningún estudiante con la CURP solicitada.',
  },
  questions: {
    list: 'No se encantraró ninguna pregunta frecuente',
  },
  numerals: {
    errors: {
      list: 'No se encontraron subsistemas para la numeralia',
      calculate:
        'No se ha podido calcular la numeralia con las fechas proporcionadas',
    },
  },
  config: {
    diagnostic: 'No se encontró la configuración del diagnostico',
  },
};

export const cancelReportRequestMsg = {
  pending: 'Si confirmas la acción, la solicitud de reporte será cancelada.',
  inProgress:
    'La solicitud está en progreso, si el documento se alcanzó a generar, se podrá descargar aunque la solicitud sea cancelada.',
};
