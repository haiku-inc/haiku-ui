import classNames from 'classnames';
import type { FC } from 'react';
import { Fragment, useEffect, useState } from 'react';

import './styles.scss';

interface Props {
  total: number;
  occupied: number;
  sections?: number;
  scaleFrameWidth?: number;
  scaleWidth?: number;
  scaleDigitsMargin?: number;
  thickness?: number;
}

interface Coords {
  bottom: number;
  right: number;
  rotate: number;
}

interface Steps {
  digit: number;
  value: Coords;
  dash: Coords;
}

const RadialGaugeChart: FC<Props> = ({ total, occupied, sections, scaleDigitsMargin, ...props }) => {
  const chunk = Math.ceil(total / (sections ? sections : 5));

  const [rotateState, setRotateState] = useState(180);
  const rotateFiller = occupied < total ? Math.ceil(180 + 1.8 * ((occupied * 100) / total)) : 360;

  useEffect(() => {
    setRotateState(rotateFiller);
  });

  const scaleFrameWidth = props.scaleFrameWidth ? props.scaleFrameWidth : 320;
  const scaleWidth = props.scaleWidth ? props.scaleWidth : 240;
  const thickness = props.thickness ? props.thickness : 40;
  const margin = scaleDigitsMargin ? scaleDigitsMargin : 10;

  const determinePosition = (radius: number, point: number) => {
    const right = radius * Math.cos((point * Math.PI) / total) + scaleFrameWidth / 2;
    const bottom = radius * Math.sin((point * Math.PI) / total);
    const rotate = Math.PI + (Math.PI * point) / total;

    return { bottom, right, rotate };
  };

  const steps: Steps[] = [];

  for (let i = 0; i <= total; i += chunk) {
    steps.push({
      digit: i,
      value: determinePosition(scaleWidth / 2 + margin, i),
      dash: determinePosition(scaleWidth / 2, i),
    });
  }
  return (
    <div
      className="full-scale"
      style={{
        width: `${scaleFrameWidth}px`,
        height: `${scaleFrameWidth / 2}px`,
      }}
    >
      <div
        className="circular-tube"
        style={{
          width: `${scaleWidth}px`,
          height: `${scaleWidth / 2}px`,
          left: `calc(50% - ${scaleWidth / 2}px)`,
        }}
      >
        <div
          className="circular-tube-back"
          style={{
            width: `${scaleWidth}px`,
            height: `${scaleWidth / 2}px`,
            borderRadius: `${scaleWidth / 2}px ${scaleWidth / 2}px 0 0`,
            borderWidth: `${thickness}px`,
          }}
        />
        <div
          className="circular-tube-front"
          style={{
            rotate: `${rotateState}deg`,
            width: `${scaleWidth}px`,
            height: `${scaleWidth}px`,
          }}
        >
          <div
            className="circular-tube-front-filler"
            style={{
              width: `${scaleWidth}px`,
              height: `${scaleWidth / 2}px`,
              borderRadius: `${scaleWidth / 2}px ${scaleWidth / 2}px 0 0`,
              borderWidth: `${thickness}px`,
            }}
          />
        </div>
      </div>

      <div className="scale" style={{ width: `${scaleFrameWidth}px`, height: `${scaleWidth / 2}px` }}>
        {steps.map((step) => (
          <Fragment key={step.digit}>
            <div className="scale-step" style={{ bottom: `${step.value.bottom}px`, right: `${step.value.right}px` }}>
              <div
                className={classNames({
                  'scale-step-value': true,
                  'right-hand': step.digit > total / 2,
                  middle: step.digit === total / 2,
                })}
              >
                {step.digit}
              </div>
            </div>
            <div
              className="scale-instep"
              style={{
                bottom: `${step.dash.bottom}px`,
                right: `${step.dash.right}px`,
                rotate: `${step.dash.rotate}rad`,
              }}
            >
              <div className="scale-instep-dash" style={{ width: `${thickness}px` }} />
            </div>
          </Fragment>
        ))}
      </div>

      <div className="score" style={{ width: `${scaleFrameWidth}px`, height: `${scaleWidth / 2}px` }}>
        <div className={classNames({ 'score-digit': true, overdraft: occupied > total })}>{occupied}</div>
      </div>
    </div>
  );
};

export default RadialGaugeChart;
export type { Props };
