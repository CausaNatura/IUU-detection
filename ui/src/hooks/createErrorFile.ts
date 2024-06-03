import { ErrorFile } from 'types/global';

export const createErrorFile = async ({ file }: ErrorFile) => {
  const fileData = new Uint8Array(file);
  const blob = new Blob([fileData], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Datos_Erróneos.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
