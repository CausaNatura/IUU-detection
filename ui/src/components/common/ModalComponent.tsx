import { Modal, Form, Button } from 'antd';
import 'styles/modal.scss';

type ModalProps = {
  open: boolean;
  onOk?:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  onCancel?:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  title: string;
  dataCy?: string;
  children: React.ReactNode;
  width?: string | number;
};

type FooterProps = {
  okText: string;
  cancelText: string;
  onCancel:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  onOk:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  dataCyCancel: string;
  keyOk?: string;
  keyCancel?: string;
  dataCyOk: string;
  okDisabled?: boolean;
};

export const ModalComponent = () => {
  const ModalForm = ({
    open,
    onCancel,
    onOk,
    title,
    children,
    dataCy,
    width,
  }: ModalProps) => (
    <Modal
      className="modal-container"
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      centered
      footer={false}
      data-cy={dataCy}
      width={width}
    >
      {children}
    </Modal>
  );

  const ModalFooter = ({
    okText,
    onOk,
    cancelText,
    onCancel,
    dataCyCancel,
    keyCancel,
    keyOk,
    dataCyOk,
    okDisabled,
  }: FooterProps) => (
    <div id="modal-footer" className="g-flex justify-end mt-2">
      <Form.Item className="mb-0">
        <Button
          className="tg-button tg-cancel-button mr-2"
          type="primary"
          onClick={onCancel}
          data-cy={dataCyCancel}
          key={keyCancel}
        >
          {cancelText}
        </Button>
      </Form.Item>
      <Form.Item className="mb-0">
        <Button
          key={keyOk}
          className="tg-button"
          type="primary"
          htmlType="submit"
          data-cy={dataCyOk}
          onClick={onOk}
          disabled={okDisabled}
        >
          {okText}
        </Button>
      </Form.Item>
    </div>
  );
  return {
    ModalForm,
    ModalFooter,
  };
};
