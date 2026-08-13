import classNames from 'classnames';
import type { FC } from 'react';

interface Props {
  progress: {
    requiredSteps: number;
    completedRequiredSteps: number;
    totalSteps: number;
    completedSteps: number;
  };
}

const Progress: FC<Props> = ({ progress }) => {
  const progressPercent = (progress.completedSteps * 100) / progress.totalSteps || 0;
  const progressRequiredPercent = (progress.completedRequiredSteps * 100) / progress.requiredSteps || 0;

  return (
    <div className="flex flex-col relative justify-center items-center overflow-hidden">
      <div
        className={classNames('flex items-center w-full h-5 relative border rounded-lg box-border overflow-hidden')}
        style={{
          backgroundColor: 'oklch(from var(--warning-bg) l c h / 0.2)',
          borderColor: 'oklch(from var(--warning-bg) l c h / 0.4)',
        }}
      >
        <div
          className={classNames('h-full! bg-(--warning-bg) left-0 rounded-s-lg')}
          style={{
            width: `${progressPercent}%`,
          }}
        />
        <div className="z-1 text-sm/4 text-shadow-xs absolute left-2 top-0 text-(--text-primary) text-shadow-(color:--text-inverted)">
          {progress.completedSteps}/{progress.totalSteps}
          {!!progress.completedRequiredSteps && (
            <span>
              {' '}
              (required: {progress.completedRequiredSteps}/{progress.requiredSteps})
            </span>
          )}
        </div>
      </div>
      {!!progress.completedRequiredSteps && (
        <div
          className={classNames(
            'flex items-center absolute bottom-0 w-full h-1.75  box-border rounded-b-lg overflow-hidden',
          )}
          style={{
            backgroundColor: 'oklch(from var(--error-bg) l c h / 0.8)',
            borderColor: 'oklch(from var(--error-bg) l c h / 0.8)',
          }}
        >
          <div
            className={classNames('h-full! absolute bg-(--error-bg) bottom-0 left-0')}
            style={{
              width: `${progressRequiredPercent}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Progress;
