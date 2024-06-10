import { Button, Image, Popconfirm } from 'antd';
import '../../styles/messages.scss';
import MessageReport from '/assets/icon/icon-message-report.svg';

const MessageProblem = () => {
  return (
    <div className="message-problem-container">
      <Popconfirm
        title={
          <h2>¿Algún problema para visualizar correctamente el predictor en tu zona?</h2>
        }
        description={
          <p>
            Envía un correo con el asunto
            <span className='subject'> Error predictor datacenter</span>
            <span className='mail'> info@causanatura.org</span> o da click aquí para conectar con
            tu cuenta de email de forma automática
          </p>
        }
      >
        <Button className="btn-info" href="#">
          <Image src={MessageReport} preview={false} />
        </Button>
      </Popconfirm>
    </div>
  );
};
export default MessageProblem;
