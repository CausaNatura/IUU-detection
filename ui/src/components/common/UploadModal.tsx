import { useEffect, useState } from 'react';
import { Upload, Modal, Button, Space } from 'antd';
import {
  InboxOutlined,
  WarningOutlined,
  CloudDownloadOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import openNotification from 'hooks/notificationHook';
import { uploadStudents } from 'api/student.api';
import { uploadSchools } from 'api/school.api';
import { downloadFile } from 'hooks/downloadFile';
import { useNavigate } from 'react-router-dom';
import { paths } from 'constants/paths';
import { ModalComponent } from './ModalComponent';
import 'styles/modal.scss';
import { uploadUsers } from 'api/user.api';
import { createErrorFile } from 'hooks/createErrorFile';
import io from 'socket.io-client';
import MessageModal from 'hooks/MessageModal';
import ProgressBar from './ProgressBar';
import GetFrontendConfig from 'hooks/getFrontConfig';
const { Dragger } = Upload;

const UploadModal = ({
  openUploadModal,
  onCancel,
  registerType,
  urlFile,
  onBulk,
}: {
  openUploadModal: boolean;
  onCancel: () => void;
  registerType: string;
  urlFile: string;
  onBulk: ((formData: FormData) => void) | undefined;
}) => {
  const config = GetFrontendConfig();
  const socket = io(
    `${config ? config.global.socketUrl : 'localhost'}:${config ? config.global.socketPort : 3000}`
  );

  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const navigate = useNavigate();
  const { ModalFooter } = ModalComponent();
  const [currentRow, setCurrentRow] = useState<number | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [openRow, setOpenRow] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  interface Progress {
    currentRow: number;
    size: number;
  }

  useEffect(() => {
    socket.on('progress', (progress: Progress) => {
      if (size === null && progress.size) {
        setSize(progress.size);
        setCurrentRow(0);
      }

      if (progress.currentRow) {
        setCurrentRow(progress.currentRow);
      }

      if (size !== null && currentRow !== null) {
        const calculatedPercent = Math.round((currentRow / size) * 100);
        setProgressPercent(calculatedPercent);
      }
    });

    return () => {
      socket.off('progress');
    };
  }, [currentRow, size, progressPercent, socket]);

  const uploadFile = async (formData: FormData) => {
    Modal.destroyAll();
    switch (registerType) {
      case 'students':
        setOpenRow(true);
        return await uploadStudents(formData);
      case 'schools':
        return await uploadSchools(formData);
      case 'users':
        return await uploadUsers(formData);
      case 'delete':
        if (onBulk === undefined) {
          openNotification({
            type: 'error',
            placement: 'top',
            message: 'Error',
            description: 'Fallo el proceso de borrado masivo',
            icon: <CloseCircleOutlined className="tg-error" />,
          });
          return;
        }
        return await onBulk(formData);
      default:
        return await uploadStudents(formData);
    }
  };

  const handleUpload = async () => {
    if (fileToUpload) {
      MessageModal({
        title: 'Enviando respuestas',
        content: 'Guardando. Por favor espera un momento.',
        maskClosable: false,
        type: 'info',
        icon: <LoadingOutlined className="spin" />,
        footer: false,
      });
      try {
        const formData = new FormData();
        formData.append('file', fileToUpload);
        const response = await uploadFile(formData);
        setOpenRow(false);
        setProgressPercent(0);
        setCurrentRow(0);
        setSize(0);
        onCancel();
        if (
          response &&
          response.newBadRegisters &&
          response.newBadRegisters.length > 0
        ) {
          if (response && response.file.data) {
            openNotification({
              type: 'info',
              placement: 'top',
              message: 'Hay algunos datos que no pudieron ser procesados',
              description:
                'Se descargara un excel con los datos no procesados y porque no pudieron ser procesados.',
              icon: <CloseCircleOutlined className="tg-error" />,
              duration: null,
            });
            await createErrorFile({ file: response.file.data });
          }
          response.fileName = fileToUpload.name;
          openNotification({
            type: 'error',
            placement: 'top',
            message: 'Existen registros con problemas',
            description:
              'Existen registros con problemas. Puedes revisarlos a continuación',
            duration: null,
            showConfirmBtn: true,
            onConfirm: async () => {
              navigate(`/${paths.admin.index}/${paths.admin.uploadErrors}`, {
                state: { object: response ?? '' },
              });
            },
            confirmBtnLabel: 'Ver problemas',
            icon: <CloseCircleOutlined className="tg-error" />,
          });
          return;
        }
        openNotification({
          type: 'info',
          placement: 'top',
          message: 'Ha terminado el proceso',
          description: 'Verifica los datos!',
        });
        setFileToUpload(null);
        onCancel();
      } catch (error) {
        Modal.destroyAll();
        openNotification({
          type: 'error',
          placement: 'top',
          message: 'Error',
          description: 'No se ha podido subir el archivo o fallo el proceso',
          icon: <CloseCircleOutlined className="tg-error" />,
        });
      }
    }
  };

  const handleBeforeUpload = async (file: RcFile) => {
    try {
      const allowedExtensions = ['.xlsx'];
      const fileExtension = file.name.slice(file.name.lastIndexOf('.'));
      if (!allowedExtensions.includes(fileExtension)) {
        openNotification({
          type: 'error',
          placement: 'top',
          message: 'Archivo inválido',
          description: 'Solo se permiten archivos de excel',
          icon: <WarningOutlined className="tg-error" />,
        });
        return false;
      }
      setFileToUpload(file);
      return false;
    } catch (error) {
      return false;
    }
  };

  const props = {
    multiple: false,
    beforeUpload: handleBeforeUpload,
  };

  return (
    <>
      <Modal
        open={openRow}
        footer={false}
        closable={false}
        maskClosable={false}
        title={`Espera a que el proceso termine, no cierres el navegador o la ventana.`}
      >
        <Space align="center">
          <ProgressBar
            percent={progressPercent}
            format={(number) => `${number}%`}
          />
        </Space>
      </Modal>
      <Modal
        open={openUploadModal}
        title={`Subir ${registerType} por excel`}
        onCancel={onCancel}
        footer={false}
        centered
      >
        <Button
          onClick={() => downloadFile({ url: urlFile })}
          className=" g-btn-new g-flex g-align-center"
        >
          <CloudDownloadOutlined className="g-icon" />
          Descargar Plantilla
        </Button>
        <Dragger className="tg-dragger-upload" {...props}>
          <InboxOutlined className="tg-icon-dragger mb-1" />
          Arrastra y suelta el archivo o haz clic para seleccionarlo
        </Dragger>
        <div className="g-flex g-end">
          <ModalFooter
            okText="Subir archivo"
            cancelText="Cancelar"
            onCancel={onCancel}
            onOk={handleUpload}
            dataCyCancel=""
            keyOk="submit"
            keyCancel="cancel"
            dataCyOk=""
            okDisabled={!fileToUpload}
          />
        </div>
      </Modal>
    </>
  );
};

export default UploadModal;
