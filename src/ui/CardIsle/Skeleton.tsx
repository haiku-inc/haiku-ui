import CardButtonLeft from '@/assets/images/card/button-left.svg';
import CardButtonRight from '@/assets/images/card/button-right.svg';
import SkeletonBlock from '@/ui/SkeletonBlock';
import Thumbnail from '@/ui/Thumbnail';
import type { FC } from 'react';

const CardIsleSkeleton: FC = () => (
  <div className="w-75 h-96.25 shrink-0">
    <div className="image-canvas">
      <div className="custom-background h-87.5!">
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
  </div>
);

export default CardIsleSkeleton;
