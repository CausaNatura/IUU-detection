import { Button, Space, notification } from 'antd';
import {
  IconType,
  NotificationPlacement,
} from 'antd/es/notification/interface';
import '../styles/global.scss';

export type NotificationPopUpProps = {
  icon?: React.ReactNode;
  type: IconType;
  placement?: NotificationPlacement;
  message: string;
  description: React.ReactNode | string;
  duration?: number | null;
  showConfirmBtn?: boolean;
  key?: string;
  confirmBtnLabel?: string;
  onConfirm?: () => Promise<void> | void;
  onClose?: () => void;
};

const openNotification = ({
  type,
  placement,
  message,
  description,
  duration,
  showConfirmBtn,
  key,
  confirmBtnLabel,
  onConfirm,
  onClose,
  icon,
}: NotificationPopUpProps) => {
  const handleOnClick = () => {
    if (onConfirm) {
      onConfirm();
    }
    notification.destroy(key);
  };
  const handleOnClose = () => {
    if (onClose) {
      onClose();
    }
    notification.destroy(key);
  };
  const btn = showConfirmBtn ? (
    <Space>
      <Button
        type="default"
        size="small"
        onClick={handleOnClose}
        data-cy={`cancel-ntf-btn-${key}`}
        className="tg-button tg-primary-default-btn "
      >
        Cancelar
      </Button>
      <Button
        type="primary"
        data-cy={`confirm-ntf-btn-${key}`}
        size="small"
        onClick={handleOnClick}
        className="tg-button tg-cancel-button"
      >
        {confirmBtnLabel ?? 'Confirmar'}
      </Button>
    </Space>
  ) : (
    <></>
  );
  notification[type]({
    key: key ?? undefined,
    message,
    description,
    placement: placement ? placement : 'topRight',
    duration, //In seconds, default: 4.5 | if duration is null, notification never will be closed
    btn,
    onClose,
    icon,
  });
};

export default openNotification;
