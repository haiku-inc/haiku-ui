import classNames from 'classnames';
import CardTitleUniversal from '../assets/images/card/title-universal.svg';
import type { ChallengeType } from '../types';

interface CardTitleProps {
  type: ChallengeType | 'roadmap' | 'article' | 'trustnoone';
  title: string;
  subtitle?: string;
  className?: string;
  textColor?: string;
  backgroundColor?: string;
}

const CardTitle = ({ type, title, subtitle, className, textColor, backgroundColor }: CardTitleProps) => {
  return (
    <>
      <CardTitleUniversal
        className={classNames('card-title z-1', className)}
        color={backgroundColor || `var(--content-type-${type})`}
      />
      <h6 className="card-title-caption z-1" style={{ color: textColor || `var(--content-type-${type}-text)` }}>
        <strong>{title}</strong>
        {!!subtitle && ` | ${subtitle}`}
      </h6>
    </>
  );
};

export default CardTitle;
