import { getSchoolsList } from 'api/school.api';
import openNotification from 'hooks/notificationHook';

const getSchools = async (text: string) => {
  try {
    const result = await getSchoolsList(text);
    return result;
  } catch (error) {
    openNotification({
      type: 'error',
      placement: 'top',
      message: 'Error',
      description: 'No se pudieron cargar las escuelas',
    });
  }
};

export default getSchools;
