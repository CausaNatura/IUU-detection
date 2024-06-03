import { format } from 'date-fns-tz';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date) => {
  const formattedDate = format(date, 'dd/MM/yyyy', {
    timeZone: 'America/Mexico_City',
    locale: es,
  });
  return formattedDate;
};
