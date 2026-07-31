import classNames from 'classnames';
import type { FC } from 'react';
import './styles.scss';

export interface LoadingProps {
  centered?: boolean;
  relative?: boolean;
  tiny?: boolean;
}
const Loading: FC<LoadingProps> = ({ centered, relative, tiny }) => (
  <>
    {!relative && !tiny && <div className="overlay" />}
    <div className={classNames('loader-ring', { 'justify-self-center': centered, relative, tiny })}>
      <div className="filler">
        <div className="rotate rotate-1" />
        <div className="rotate rotate-2" />
        <div className="rotate-shadow" />
        <div className="scale" />
      </div>
    </div>
  </>
);

export default Loading;
