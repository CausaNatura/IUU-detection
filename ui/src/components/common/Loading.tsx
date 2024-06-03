import { Col, Modal, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface INotificationLoading {
  isModalOpen: boolean;
  message: string;
  setIsModalOpen: (value: boolean) => void;
}

const Loading = ({
  isModalOpen,
  message,
  setIsModalOpen,
}: INotificationLoading) => {
  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onCancel={onCancel} footer={false}>
      <Row>
        <Col xs={12}>
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </Col>
        <Col xs={12}>
          <p>{message}</p>
        </Col>
      </Row>
    </Modal>
  );
};
export default Loading;
