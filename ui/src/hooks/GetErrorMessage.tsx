import { defaultErrorStrings, strings } from 'constants/globalStrings';
import { statuses } from 'constants/statuses';
import openNotification from './notificationHook';
import { CloseCircleOutlined } from '@ant-design/icons';

interface ShowErrorMessageProps {
  status: number;
  notFound?: string;
  badFormat?: string;
  icon?: React.ReactNode;
  timesOver?: string;
}

export const ShowErrorMessage = ({
  status,
  notFound,
  badFormat,
  timesOver,
}: ShowErrorMessageProps) => {
  let description: string;
  switch (status) {
    case statuses.NOTFOUND:
      description = notFound ?? defaultErrorStrings.notFound;
      break;
    case statuses.BADFORMAT:
      description = badFormat ?? defaultErrorStrings.badFormat;
      break;
    case statuses.TIMESOVER:
      description = timesOver ?? defaultErrorStrings.timesOver;
      break;
    default:
      description = strings.serverError;
  }
  openNotification({
    type: 'error',
    placement: 'top',
    message: '¡Error!',
    description,
    icon: <CloseCircleOutlined className="tg-error" />,
  });
};
