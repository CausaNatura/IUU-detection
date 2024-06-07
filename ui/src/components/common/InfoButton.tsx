import { useState } from 'react';
import { Button, Modal, Image } from 'antd';
import '../../styles/info-button.scss';

const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="info-container">
      <Button className="btn-info" href="#" onClick={showModal}>
        <div className="info" />
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        className="modal-info"
        width={1000}
      >
        <h2>
          ¿Cómo interpretar
          <br /> la herramienta?
        </h2>
        <p>
          Se ha elaborado una serie de herramientas e iniciativas para combatir
          la pesca INDNR que respaldan el marco internacional. Estas iniciativas
          refuerzan la cooperación internacional e incrementan el nivel de
          conocimiento sobre aspectos específicos de la pesca INDNR, apoyando
          directamente la capacidad de los Estados y las organizaciones para
          combatir la pesca INDNR de forma eficaz.
        </p>
        <p>
          Pesca ilegal, no declarada y no reglamentada (pesca INDNR) es un
          término amplio que engloba una gran variedad de actividades pesqueras.
        </p>
        <div className="btn-container">
          <Button className="btn-modal-info">
            Saber más
            <Image
              className="icon"
              src="/assets/icon/icon-down.svg"
              preview={false}
            />
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default InfoButton;
