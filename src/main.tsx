import { Profiler, StrictMode, Suspense, type FC } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { GreenButton, Text } from './ui';
import Loading from './ui/Loading';

function onRender(
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
) {
  // Aggregate or log render timings...
  // console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);

  if (sessionStorage.getItem('showProfiler')) {
    const style =
      'background: rgb(0 0 128/0.1); color: lightgray; font-size: 0.75rem; font-weight: bold; -webkit-text-stroke: 1px gray;';
    // eslint-disable-next-line no-console
    console.debug(
      `%c${id}, ${phase}, actual: ${Math.round(actualDuration * 100) / 100}s, base: ${
        Math.round(baseDuration * 100) / 100
      }s, start: ${Math.round(startTime * 100) / 100}s, commit: ${Math.round(commitTime * 100) / 100}s `,
      style,
    );
  }
}

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

const MainLayout: FC = () => {
  return (
    <div className="p-10 -bottom-13">
      <Text.HeadingIsle>Hello world!</Text.HeadingIsle>
      <Text.HeadingIsleSmaller>Hello world!</Text.HeadingIsleSmaller>
      <Text.Comment>Hello world!</Text.Comment>
      <GreenButton isTrulyGreen>Hello world!</GreenButton>
    </div>
  );
};

root.render(
  <Suspense fallback={<Loading />}>
    <Profiler id="StrictMode" onRender={onRender}>
      <StrictMode>
        <MainLayout />
      </StrictMode>
    </Profiler>
  </Suspense>,
);
