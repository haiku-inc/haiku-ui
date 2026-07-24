import type { ChallengeSpecialty, ChallengeType, RoadmapProgress, Specialty } from '../../types';
import CardButtonLeft from '../../assets/images/card/button-left-defensive.svg';
import CardButtonRight from '../../assets/images/card/button-right.svg';
import HaikuIncLogo from '../../assets/unicons/haiku-inc.svg';
import Progress from '../Progress';
import CardTitle from '../CardTitle';
import ChallengeSpecialtyButton from '../GameCard/ChallengeSpecialtyButton';
import Pill from '../Pill';
import Thumbnail from '../Thumbnail';
import Tooltip from '../Tooltip';
import { defaultBackground } from '../../utils/layout';
import { useNavigate } from '../../utils/router';
import { EngineeringOutlined, PersonOutlined, StarBorder } from '@mui/icons-material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from '@mui/material';
import classNames from 'classnames';
import type { FC, MouseEvent, ReactElement } from 'react';
import { useMemo } from 'react';
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
}

enum CompletionStatus {
  NOT_STARTED = 0,
  PAUSED = 1,
  COMPLETED = 2,
}

const CardIsle: FC<Props> = ({
  coverURL,
  badgeURL,
  badge,
  type,
  specialty,
  subtype,
  isCompleted,
  url,
  onCardClick,
  onLeftButtonClick,
  onRightButtonClick,
  name,
  isBadgeShown,
  rating,
  author,
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
                <VerifiedIcon className="completed" color="success" />
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

          <div
            className={classNames('card-content w-full', {
              '-bottom-13': hasButton,
              '-bottom-31': !hasButton,
            })}
          >
            <div className="info-stripe">
              {!!rating && <Pill icon={<StarBorder />} label={rating.toString()} />}
              {!!specialty && <Pill icon={<EngineeringOutlined />} label={specialty} />}
              {!!author && <Pill icon={<PersonOutlined />} label={author} />}
            </div>

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
export { CompletionStatus, CardIsleSkeleton as GameCardSkeleton };
