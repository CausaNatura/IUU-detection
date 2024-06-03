import { Col, Modal, Row } from 'antd';
import { LoadingOutlined, CloseCircleFilled } from '@ant-design/icons';

interface INotificationLoading {
  isModalOpen: boolean;
  message: string;
  setIsModalOpen: (value: boolean) => void;
  type: 'Error' | 'Loading';
  maskClosable: boolean;
}

const MessageModal = ({
  isModalOpen,
  message,
  setIsModalOpen,
  type,
  maskClosable,
}: INotificationLoading) => {
  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      closable={maskClosable}
      maskClosable={maskClosable}
      open={isModalOpen}
      onCancel={onCancel}
      footer={false}
    >
      <Row>
        <Col className="loader" xs={12}>
          {type === 'Loading' && <LoadingOutlined className="spin" spin />}
          {type === 'Error' && <CloseCircleFilled className="close" />}
        </Col>
        <Col xs={12}>
          <p>{message}</p>
        </Col>
      </Row>
    </Modal>
  );
};
export default MessageModal;
