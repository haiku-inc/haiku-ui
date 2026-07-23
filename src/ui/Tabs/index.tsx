import classNames from 'classnames';
import type { FC, PropsWithChildren, Ref, StyleHTMLAttributes } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import type { Props as TabProps } from './Tab';
import Tab from './Tab';
import './styles.scss';

interface Props {
  value?: string | number;
  title?: string;
  onChange(value: string | number): void;
  condensed?: boolean;
  className?: string;
  ref?: Ref<HTMLDivElement>;
  style?: StyleHTMLAttributes<HTMLDivElement>['style'];
}

const Tabs: FC<PropsWithChildren<Props>> = ({ value, title, onChange, className, children, ref, style, condensed }) => {
  const renderedChildren = Children.map(children, (child) => {
    if (!isValidElement<TabProps>(child) || child.type !== Tab) {
      return child;
    }

    return cloneElement(child, {
      onChange,
      isActive: child.props.id === value,
    });
  });

  return (
    <div className={classNames('haiku-tabs', className, { condensed })} ref={ref} style={style}>
      {!!title && <span className="haiku-tabs-title">{title}</span>}
      {renderedChildren}
    </div>
  );
};

interface ICompound extends FC<PropsWithChildren<Props>> {
  Tab: typeof Tab;
}

(Tabs as ICompound).Tab = Tab;

export default Tabs as ICompound;
