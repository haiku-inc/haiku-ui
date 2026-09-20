import classNames from 'classnames';
import type { CSSProperties, FC, HTMLAttributes, JSX, MouseEvent, PropsWithChildren } from 'react';
import './styles.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: string;
}

const Button: FC<PropsWithChildren<Props>> = ({ color, icon, onClick, children, className, disabled, ...rest }) => {
  const style = {
    '--btn-color': color,
  } as CSSProperties;

  return (
    <button
      {...rest}
      className={classNames('button-general', { 'is-active': !!onClick }, className)}
      onClick={onClick}
      disabled={disabled}
      data-after={children}
      style={style}
    >
      {icon}
      {children}
    </button>
  );
};

type VariantBase = typeof Button;

type NestedVariant = VariantBase & {
  Error: typeof Button;
  Warning: typeof Button;
  Info: typeof Button;
  Primary: typeof Button;
  Secondary: typeof Button;
  Tertiary: typeof Button;
  Legendary: typeof Button;
  Epic: typeof Button;
};

interface ICompound extends VariantBase {
  Text: NestedVariant;
  Filled: NestedVariant;
  Error: typeof Button;
  Warning: typeof Button;
  Info: typeof Button;
  Primary: typeof Button;
  Secondary: typeof Button;
  Tertiary: typeof Button;
  Legendary: typeof Button;
  Epic: typeof Button;
}

const variantCreator = (variantClass: string) => {
  return ({ className, ...rest }: PropsWithChildren<Props>) => (
    <Button {...rest} className={classNames(variantClass, className)} />
  );
};

const textCreator = (variantClass: string) => {
  return (({ className, ...rest }: PropsWithChildren<Props>) => (
    <Button {...rest} className={classNames('button-text', variantClass, className)} />
  )) as NestedVariant;
};

const filledCreator = (variantClass: string) => {
  return (({ className, ...rest }: PropsWithChildren<Props>) => (
    <Button {...rest} className={classNames('button-filled', variantClass, className)} />
  )) as NestedVariant;
};

(Button as ICompound).Text = variantCreator('button-text') as NestedVariant;
(Button as ICompound).Filled = variantCreator('button-filled') as NestedVariant;
(Button as ICompound).Error = variantCreator('button-error');
(Button as ICompound).Warning = variantCreator('button-warning');
(Button as ICompound).Info = variantCreator('button-info');
(Button as ICompound).Info = variantCreator('button-success');
(Button as ICompound).Primary = variantCreator('button-primary');
(Button as ICompound).Secondary = variantCreator('button-secondary');
(Button as ICompound).Tertiary = variantCreator('button-tertiary');
(Button as ICompound).Legendary = variantCreator('button-legendary');
(Button as ICompound).Epic = variantCreator('button-epic');

(Button as ICompound).Text.Error = textCreator('button-error');
(Button as ICompound).Text.Warning = textCreator('button-warning');
(Button as ICompound).Text.Info = textCreator('button-info');
(Button as ICompound).Text.Info = textCreator('button-success');
(Button as ICompound).Text.Primary = textCreator('button-primary');
(Button as ICompound).Text.Secondary = textCreator('button-secondary');
(Button as ICompound).Text.Tertiary = textCreator('button-tertiary');
(Button as ICompound).Text.Legendary = textCreator('button-legendary');
(Button as ICompound).Text.Epic = textCreator('button-epic');

(Button as ICompound).Filled.Error = filledCreator('button-error');
(Button as ICompound).Filled.Warning = filledCreator('button-warning');
(Button as ICompound).Filled.Info = filledCreator('button-info');
(Button as ICompound).Filled.Info = filledCreator('button-success');
(Button as ICompound).Filled.Primary = filledCreator('button-primary');
(Button as ICompound).Filled.Secondary = filledCreator('button-secondary');
(Button as ICompound).Filled.Tertiary = filledCreator('button-tertiary');
(Button as ICompound).Filled.Legendary = filledCreator('button-legendary');
(Button as ICompound).Filled.Epic = filledCreator('button-epic');

export default Button as ICompound;
