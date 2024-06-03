import { Modal, ModalFuncProps } from 'antd';

const MessageModal = ({
  type,
  onOk,
  title,
  content,
  maskClosable,
  icon,
  footer,
}: ModalFuncProps) => {
  Modal[type ? type : 'success']({
    title,
    content,
    onOk,
    maskClosable,
    icon,
    footer,
  });
};
export default MessageModal;
