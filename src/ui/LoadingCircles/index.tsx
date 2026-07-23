import type { FC } from 'react';

import './styles.scss';

export interface Props {
  centered?: boolean;
  relative?: boolean;
  tiny?: boolean;
}
const LoadingCircles: FC<Props> = () => (
  <div className="circles-container">
    <div className="circle red"></div>
    <div className="circle green"></div>
    <div className="circle blue"></div>
  </div>
);

export default LoadingCircles;
