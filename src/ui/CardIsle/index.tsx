import { Link } from '@mui/material';
import classNames from 'classnames';
import type { FC, MouseEvent, ReactElement } from 'react';
import { useMemo } from 'react';
import CardButtonLeft from '../../assets/images/card/button-left-defensive.svg';
import CardButtonRight from '../../assets/images/card/button-right.svg';
import HaikuIncLogo from '../../assets/unicons/haiku-inc.svg';
import VerifiedIcon from '../../assets/unicons/service/verified.svg';
import type { ChallengeSpecialty, ChallengeType, RoadmapProgress, Specialty } from '../../types';
import { defaultBackground } from '../../utils/layout';
import { useNavigate } from '../../utils/router';
import CardTitle from '../CardTitle';
import { ChallengeSpecialtyButton } from '../GameCard';
import Progress from '../Progress';
import Thumbnail from '../Thumbnail';
import Tooltip from '../Tooltip';
import CardIsleSkeleton from './Skeleton';
import './styles.scss';

interface Props {
  coverURL?: string;
  badgeURL?: string;
  badge?: ReactElement;
  specialty?: Specialty | ChallengeSpecialty;
  type: ChallengeType | 'roadmap';
  subtype?: string;
  isCompleted?: boolean;
  isBadgeShown?: boolean;
  rating?: number;
  name?: string;
  url?: string;
  onCardClick?: () => void;
  onLeftButtonClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onRightButtonClick?: (e: MouseEvent<HTMLDivElement>) => void;
  author?: string;
  onCallToActionClick?: () => void;
  callToActionCaption?: string;
  leftButtonContent?: ReactElement | string;
  rightButtonContent?: ReactElement | string;
  description?: string;
  progress?: RoadmapProgress;
  className?: string;
  isHaikuDeveloped?: boolean;
  difficulty?: string;
  category?: ChallengeSpecialty;
  isFree?: boolean;
}

const CardIsle: FC<Props> = ({
  coverURL,
  badgeURL,
  badge,
  type,
  subtype,
  isCompleted,
  url,
  onCardClick,
  onLeftButtonClick,
  onRightButtonClick,
  name,
  isBadgeShown,
  onCallToActionClick,
  callToActionCaption,
  description,
  progress,
  className,
  leftButtonContent,
  rightButtonContent,
  isHaikuDeveloped,
  difficulty,
  category,
  isFree,
}) => {
  const navigate = useNavigate();

  const defaultCover = useMemo(() => defaultBackground(), []);

  const hasButton = !!onCallToActionClick || (!!url && !!callToActionCaption) || (!!category && !!difficulty);
  let difficultyLevel = 0;
  switch (difficulty) {
    case 'Easy':
      difficultyLevel = 1;
      break;
    case 'Medium':
      difficultyLevel = 2;
      break;
    case 'Hard':
      difficultyLevel = 3;
      break;
    case 'Expert':
      difficultyLevel = 4;
      break;
  }

  const getTitle = (type: ChallengeType | 'roadmap') => {
    if (type === 'roadmap') {
      return 'Learning path';
    }
    if (type === 'forge') {
      return 'Lab lesson';
    }
    return type;
  };

  return (
    <div className={classNames('w-75 h-96.25 group', className)}>
      <div
        className="card-isle-image-canvas"
        onClick={onCardClick ? onCardClick : url ? () => navigate(url) : undefined}
      >
        <div
          className="custom-background"
          style={{
            backgroundImage: `linear-gradient(to top, var(--quinary) 0%, oklch(from var(--quinary) l c h / 0.8) 25%, transparent 40%), url(${!coverURL ? defaultCover : coverURL})`,
          }}
        >
          {isCompleted && (
            <Tooltip title="You already completed this" description="But you may go through again.">
              <div className="completion-status">
                <VerifiedIcon className="completed" style={{ color: 'var(--success-text)' }} />
              </div>
            </Tooltip>
          )}
          <div className="trapezoid-shadow">
            <div />
          </div>
          <CardTitle title={getTitle(type)} subtitle={subtype} type={type} className="card-title" />

          {!!isBadgeShown && (
            <div className="custom-badge">
              <Thumbnail url={badgeURL} contain />
            </div>
          )}

          {isHaikuDeveloped && (
            <div className="is-haiku-developed" data-tooltip="This content is developed by the Haiku team">
              <HaikuIncLogo />
            </div>
          )}

          {!!badge && <div className="decorative-badge">{badge}</div>}

          <Link href={url}>
            <div className="short-view-title line-clamp-1">{name}</div>
          </Link>

          {!!progress && (
            <div className="short-view-progress opacity-50 group-hover:opacity-100">
              <Progress progress={progress} />
            </div>
          )}

          <div className="card-content" style={{ bottom: !hasButton ? '-124px' : '-52px' }}>
            {!!description && (
              <div
                className={classNames('description', {
                  'h-11.25 line-clamp-3': hasButton,
                  'h-29 line-clamp-8': !hasButton,
                })}
              >
                {description}
              </div>
            )}
          </div>
        </div>
        {!!category && !!difficulty && (
          <div className="buttons">
            <ChallengeSpecialtyButton specialty={category} />
            <div className="button" title={`Difficulty - ${difficulty}`}>
              <div className={`indicator custom-icon difficulty-icon difficulty-level-${difficultyLevel}`}>
                <div />
                <div />
                <div />
                <div />
              </div>
              <CardButtonRight />
            </div>

            {!!isFree && (
              <div
                className="free-content"
                data-tooltip="No subscription or payment is needed for this item"
                data-tooltip-top={-50}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 11h12a4 4 0 0 1 3.9 4.9l-.8 3.2A2 2 0 0 1 19.2 21H18a2 2 0 0 1-1.8-1.1L15 17H9l-1.2 2.9A2 2 0 0 1 6 21H4.8a2 2 0 0 1-1.9-1.9l-.8-3.2A4 4 0 0 1 6 11z" />
                  <path d="M6.5 14h2" />
                  <path d="M7.5 13v2" />
                  <circle cx="16" cy="14" r="0.5" fill="currentColor" />
                  <circle cx="17.5" cy="15.5" r="0.5" fill="currentColor" />
                  <path
                    d="M12 2l1.2 2.6 2.8.4-2 2 .5 2.8L12 8.4l-2.5 1.4.5-2.8-2-2 2.8-.4z"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
                Free
              </div>
            )}
          </div>
        )}
        {!!onCallToActionClick && (
          <button
            disabled={!!leftButtonContent || !!rightButtonContent}
            type="button"
            className="call-to-action-button"
            onClick={
              onCallToActionClick
                ? (e) => {
                    e.stopPropagation();
                    onCallToActionClick();
                  }
                : undefined
            }
          >
            {callToActionCaption || 'Play & learn now'}
          </button>
        )}
        {!!url && !!callToActionCaption && (
          <Link
            href={url}
            className={classNames('call-to-action-button', { disabled: !!leftButtonContent || !!rightButtonContent })}
          >
            {callToActionCaption || 'Play & learn now'}
          </Link>
        )}

        {(!!leftButtonContent || !!rightButtonContent) && (
          <>
            <div className="inverted-trapezoid-shadow" />

            <div className="buttons font-bold inverted-text-shadow">
              <div className="button" onClick={onLeftButtonClick}>
                <div className="indicator custom-icon" style={{ color: 'red' }}>
                  {leftButtonContent}
                </div>
                <CardButtonLeft />
              </div>
              <div className="button" onClick={onRightButtonClick}>
                <div className="indicator custom-icon">{rightButtonContent}</div>
                <CardButtonRight />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardIsle;
export { CardIsleSkeleton };
