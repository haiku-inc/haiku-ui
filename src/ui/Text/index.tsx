import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import Error from './Error';
import HeadingIsle from './HeadingIsle';
import HeadingIsleSmaller from './HeadingIsleSmaller';
import HeadingPage from './HeadingPage';
import HeadingPageSmaller from './HeadingPageSmaller';
import Info from './Info';
import Success from './Success';
import TextComment from './TextComment';
import Warning from './Warning';
import './styles.scss';

interface Props {
  className?: string;
}

const Text: FC<PropsWithChildren<Props>> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={classNames('text-block not-last:mb-2 text-block', className)}>
      {children}
    </div>
  );
};

interface ICompound extends FC<PropsWithChildren<Props>> {
  HeadingPage: typeof HeadingPage;
  HeadingPageSmaller: typeof HeadingPageSmaller;
  HeadingIsle: typeof HeadingIsle;
  HeadingIsleSmaller: typeof HeadingIsleSmaller;
  Comment: typeof TextComment;
  Info: typeof Info;
  Warning: typeof Warning;
  Success: typeof Success;
  Error: typeof Error;
}

(Text as ICompound).HeadingPage = HeadingPage;
(Text as ICompound).HeadingPageSmaller = HeadingPageSmaller;
(Text as ICompound).HeadingIsle = HeadingIsle;
(Text as ICompound).HeadingIsleSmaller = HeadingIsleSmaller;
(Text as ICompound).Comment = TextComment;
(Text as ICompound).Info = Info;
(Text as ICompound).Warning = Warning;
(Text as ICompound).Success = Success;
(Text as ICompound).Error = Error;

export default Text as ICompound;
