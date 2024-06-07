import '../../styles/scale.scss';

const Scale = () => {
  return (
    <div className="scale-container">
      <h2>Escala de probabilidades</h2>
      <div className="scale">
        <span>0%</span>
        <div className="bar-scale"></div>
        <span>100%</span>
      </div>
    </div>
  );
};
export default Scale;
