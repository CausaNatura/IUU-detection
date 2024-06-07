import '../../styles/messages.scss';

type MessageProps = {
  id: string;
  message: string;
};

function Message({ id, message }: MessageProps) {
  return (
    <div className="single-message-wrap">
      <h2>Destacado #{id}</h2>
      <p>{message}</p>
    </div>
  );
}

const FeatureMessage = () => {
  return (
    <div className="message-container">
      <Message
        id="1"
        message="La mayor probabilidad de encontrar casos de pesca ilegal se da en la parte sur del Parque Nacional, en la costa frente a Isla Montserrat."
      />
      <Message
        id="2"
        message="De igual manera, la zona norte de la Isla del Carmen muestra una probabilidad alta de encontrar casos irregulares de pesca."
      />
      <Message
        id="3"
        message="Se aconseja implementar mayor vigiliancia cerca de las costas al sur de los puertos de Loreto y Nopoló, y hasta el puerto de Ensenada Blanca."
      />
    </div>
  );
};
export default FeatureMessage;
