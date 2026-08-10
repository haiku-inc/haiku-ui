import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import type { FC, ReactNode } from 'react';
import CardButtonRight from '../../assets/images/card/button-right.svg';
import LinuxIcon from '../../assets/unicons/os/linux.svg';
import WindowsIcon from '../../assets/unicons/os/windows.svg';
import VerifiedIcon from '../../assets/unicons/service/verified.svg';
import type { ChallengeType, LearningObjectives, OperatingSystem, Specialty } from '../../types';
import { defaultBackground } from '../../utils/layout';
import { useNavigate } from '../../utils/router';
import CardTitle from '../CardTitle';
import Isle from '../Isle';
import RatingStars from '../RatingStars';
import Thumbnail from '../Thumbnail';
import Tooltip from '../Tooltip';
import ChallengeSpecialtyButton from './ChallengeSpecialtyButton';
import GameCardSkeleton from './Skeleton';
import './styles.scss';

interface Props {
  coverURL?: string;
  badgeURL?: string;
  os?: OperatingSystem;
  specialty?: Specialty;
  type: ChallengeType;
  subtype?: string;
  isCompleted?: boolean;
  isListItem?: boolean;
  isBadgeShown?: boolean;

  name?: string;
  url?: string;
  rating?: number;
  skills?: string;
  learning_objectives?: LearningObjectives[];

  isShortView?: boolean;
}

enum GameCardCompletionStatus {
  NOT_STARTED = 0,
  PAUSED = 1,
  COMPLETED = 2,
}

const GameCard: FC<Props> = ({
  coverURL,
  badgeURL,
  os,
  specialty,
  type,
  subtype,
  isCompleted,
  url,
  rating,
  name,
  skills,
  learning_objectives,
  isListItem,
  isBadgeShown,
  isShortView,
}) => {
  const navigate = useNavigate();

  const getOSIcon = (os: string) => {
    const osImageMap: { [key: string]: ReactNode } = {
      Windows: <WindowsIcon />,
      Linux: <LinuxIcon />,
    };
    return osImageMap[os] || <LinuxIcon />;
  };

  return (
    <Isle
      className={classNames('pt-7.5!', { 'list-tile': isListItem })}
      onClick={url ? () => navigate(url) : undefined}
    >
      <div className={classNames('image-canvas', { 'mb-10!': !isShortView && name })}>
        <div
          className="custom-background"
          style={{ backgroundImage: `url(${!coverURL ? defaultBackground() : coverURL})` }}
        >
          {isCompleted && (
            <Tooltip title="You already completed this game" description="But you may go through again.">
              <div className="completion-status">
                <VerifiedIcon className="completed" />
              </div>
            </Tooltip>
          )}
          <div className="trapezoid-shadow">
            <div />
          </div>
          {specialty && os && (
            <div className="inverted-trapezoid-shadow">
              <div />
            </div>
          )}
          <CardTitle type={type} title={type} subtitle={subtype} />

          {!!isBadgeShown && (
            <div className="custom-badge">
              <Thumbnail url={badgeURL} contain />
            </div>
          )}

          {isShortView && !!name && <div className="short-view-title">{name}</div>}

          {specialty && os && (
            <div className="buttons">
              <ChallengeSpecialtyButton specialty={specialty} />
              <div className="button">
                <div className="indicator custom-icon">{getOSIcon(os)}</div>
                <CardButtonRight />
              </div>
            </div>
          )}
        </div>
      </div>

      {!isShortView && rating !== undefined && <RatingStars rating={rating} />}

      {!isShortView && !!name && (
        <Typography variant="h4" className="mt-4!">
          {isCompleted && (
            <Tooltip title="You already completed this game" description="But you may go through again.">
              <VerifiedIcon className="text-(--success-text) mr-2 mb-1" style={{ width: '24px', display: 'inline' }} />
            </Tooltip>
          )}
          {name}
        </Typography>
      )}

      {!isShortView && !!skills && (
        <div className="skills">
          {skills.split('|').map((skill, index) => {
            if (index === 3) {
              return (
                <div key="dots" className="skill more">
                  ...
                </div>
              );
            }
            if (index > 3) return null; // Limit to 3 skills
            return (
              <div key={`${skill}-${index}`} className="skill" title={skill}>
                {skill}
              </div>
            );
          })}
        </div>
      )}

      {!isShortView && !!learning_objectives?.length && (
        <div className="learning-objectives">
          {learning_objectives.map((lo, index) => {
            if (index === 3) {
              return (
                <div key={lo.learning_objective} className="objective more">
                  ...
                </div>
              );
            }
            if (index > 3) return null; // Limit to 3 skills
            return (
              <div key={lo.learning_objective} className="objective">
                {lo.learning_objective}
              </div>
            );
          })}
        </div>
      )}
    </Isle>
  );
};

export default GameCard;
export { ChallengeSpecialtyButton, GameCardCompletionStatus, GameCardSkeleton };
