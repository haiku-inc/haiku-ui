import CardButtonLeft from '../../assets/images/card/button-left.svg';
import CardButtonRight from '../../assets/images/card/button-right.svg';
import Isle from '../Isle';
import SkeletonBlock from '../SkeletonBlock';
import SkeletonText from '../SkeletonText';
import Thumbnail from '../Thumbnail';
import classNames from 'classnames';
import type { FC } from 'react';

interface GameCardSkeletonProps {
  isListItem?: boolean;
  isFullCard?: boolean;
}

const GameCardSkeleton: FC<GameCardSkeletonProps> = ({ isListItem, isFullCard }) => {
  return (
    <Isle className={classNames('!pt-[30px]', { 'list-tile': isListItem })}>
      <div className="image-canvas">
        <div className="custom-background">
          <SkeletonBlock className="w-full! h-full! absolute!" />
          <div className="trapezoid-shadow" />
          <SkeletonBlock className="rounded-[5px]! trapezoid-shadow-loader" />
          <div className="inverted-trapezoid-shadow" />

          <div className="custom-badge">
            <Thumbnail isLoading contain />
          </div>

          <div className="buttons">
            <div className="button">
              <div className="indicator custom-icon">
                <SkeletonBlock className="w-full! h-full!" />
              </div>
              <CardButtonLeft />
            </div>
            <div className="button">
              <div className="indicator custom-icon"></div>
              <CardButtonRight />
            </div>
          </div>
        </div>
      </div>

      {isFullCard && (
        <>
          <div className="flex justify-center gap-2 mt-10">
            <SkeletonBlock width={150} height={30} />
            <SkeletonBlock width={30} height={30} />
          </div>
          <div className="flex justify-start gap-2 mt-4 mb-2">
            <SkeletonText width={30} isHeader />
            <SkeletonText width="100%" isHeader />
          </div>
          <SkeletonText width="100%" isHeader />
          <SkeletonText isHeader />

          <div className="mt-4">
            <SkeletonText width="100%" isHeader />
            <SkeletonText width="100%" isHeader />
            <SkeletonText width="100%" isHeader />
          </div>

          <div className="mt-4">
            <SkeletonText width="100%" isHeader />
            <SkeletonText width="100%" isHeader />
            <SkeletonText width="100%" isHeader />
          </div>
        </>
      )}
    </Isle>
  );
};

export default GameCardSkeleton;
