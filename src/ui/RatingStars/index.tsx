import { Typography } from '@mui/material';
import classNames from 'classnames';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import FullStar from '../../assets/unicons/service/star-full.svg';
import HalfStar from '../../assets/unicons/service/star-half.svg';
import EmptyStar from '../../assets/unicons/service/star.svg';
import './styles.scss';

interface RatingStarsProps {
  rating: number;
  rates?: number;
  starWidth?: string;
  isEditable?: boolean;
  onClick?: (rate: number) => void;
}

const RatingStars: FC<RatingStarsProps> = ({ rating, rates, isEditable = false, starWidth = '24px', onClick }) => {
  const [internalRating, setInternalRating] = useState<number>();
  const [isChanged, setIsChanged] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const color = isChanged ? 'var(--tertiary)' : 'var(--text-primary)';
  const width = starWidth;

  const handleChangeInternalRating = (rate: number) => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setInternalRating(rate);
    };
  };

  const handleResetInternalRating = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setInternalRating(undefined), 250);
  };

  const handleClick = (rate: number) => {
    return () => {
      if (onClick) {
        onClick(rate + 1);
      }
      setIsChanged(true);
    };
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    // const emptyStars = 5 - fullStars - halfStars;

    for (let i = 0; i < 5; i++) {
      let star = <EmptyStar style={{ color, width }} />;
      if (isEditable && internalRating !== undefined && i <= internalRating) {
        star = <FullStar style={{ color: 'var(--primary)', width }} />;
      } else if (isEditable && internalRating !== undefined) {
        star = <EmptyStar style={{ color: 'var(--primary)', width }} />;
      } else if (i < fullStars) {
        star = <FullStar style={{ color, width }} />;
      } else if (i < fullStars + halfStars) {
        star = <HalfStar style={{ color, width }} />;
      }
      if (isEditable) {
        stars.push(
          <div
            key={`star-${i}`}
            onClick={handleClick(i)}
            onMouseOver={handleChangeInternalRating(i)}
            onMouseOut={handleResetInternalRating}
          >
            {star}
          </div>,
        );
      } else {
        stars.push(<div key={`star-${i}`}>{star}</div>);
      }
    }

    return stars;
  };

  const getRatesAmountString = (rates: number = 0) => (
    <Typography
      variant="subtitle2"
      className="ml-2 normal-case text-(--text-dimmed)"
    >{` among ${rates} rates`}</Typography>
  );

  return (
    <div className={classNames('rating-stars', { 'is-editable': isEditable })}>
      {getRatingStars(rating)}
      {!isEditable && (
        <span className="flex items-baseline ml-2">
          ({rating}){!!rates && getRatesAmountString(rates)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
