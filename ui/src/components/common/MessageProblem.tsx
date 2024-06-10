import { Button, Image, Popconfirm } from 'antd';
import '../../styles/messages.scss';
import MessageReport from '/assets/icon/icon-message-report.svg';
import Copy from '/assets/icon/icon-copy.svg';
import Link from 'antd/es/typography/Link';

const MessageProblem = () => {
  return (
    <div className="message-problem-container">
      <Popconfirm
        title={
          <h2>
            ¿Algún problema para visualizar correctamente el predictor en tu
            zona?
          </h2>
        }
        description={
          <p>
            Envía un correo con el asunto
            <span className="subject"> Error predictor datacenter</span>
            <Link href="" className="mail">
              {' '}
              info@causanatura.org <Image src={Copy} preview={false} />
            </Link>{' '}
            O da <Link className="link">click aquí</Link> para conectar con tu
            cuenta de email de forma automática
          </p>
        }
        showCancel={false}
        okText="x"
      >
        <Button className="btn-info" href="#">
          <Image src={MessageReport} preview={false} />
        </Button>
      </Popconfirm>
    </div>
  );
};
export default MessageProblem;
