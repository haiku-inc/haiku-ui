import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { Typography } from '@mui/material';
import classNames from 'classnames';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import './styles.scss';

interface RatingStarsProps {
  rating: number;
  rates?: number;
  isEditable?: boolean;
  onClick?: (rate: number) => void;
}

const RatingStars: FC<RatingStarsProps> = ({ rating, rates, isEditable = false, onClick }) => {
  const [internalRating, setInternalRating] = useState<number>();
  const [isChanged, setIsChanged] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const color = isChanged ? 'var(--primary)' : 'var(--text-primary)';

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
      let star = <StarOutlinedIcon style={{ color }} />;
      if (isEditable && internalRating !== undefined && i <= internalRating) {
        star = <StarIcon style={{ color: 'var(--primary)' }} />;
      } else if (isEditable && internalRating !== undefined) {
        star = <StarOutlinedIcon style={{ color: 'var(--primary)' }} />;
      } else if (i < fullStars) {
        star = <StarIcon style={{ color }} />;
      } else if (i < halfStars) {
        star = <StarHalfIcon style={{ color }} />;
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
