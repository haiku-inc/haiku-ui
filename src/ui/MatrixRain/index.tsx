import './styles.scss';

const MatrixRain = () => {
  // Generates a random binary string
  const generateBinaryLine = () => {
    let line = '';
    for (let i = 0; i < 40; i++) {
      line += Math.round(Math.random()) === 0 ? '0' : '1';
    }
    return line;
  };

  // Create an array to render multiple columns
  const lines = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className="matrix-line">
      {generateBinaryLine()}
    </div>
  ));

  return <div className="matrix-container">{lines}</div>;
};

export default MatrixRain;
