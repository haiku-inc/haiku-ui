import Button from '@mui/material/Button';
import type { FC } from 'react';

interface Props {
  title: string;
  progress?: number;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

const Action: FC<Props> = ({
  title,
  onClick,
  variant = 'outlined',
  color = 'inherit',
  startIcon,
  endIcon,
  disabled,
  loading,
}) => (
  <Button
    size="small"
    color={color}
    variant={variant}
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
    startIcon={startIcon}
    endIcon={endIcon}
    disabled={disabled}
    loading={loading}
    className="leading-4! py-0!"
    sx={{
      '& .MuiButton-startIcon > *:nth-of-type(1), & .MuiButton-endIcon > *:nth-of-type(1)': {
        fontSize: '18px',
      },
    }}
  >
    {title}
  </Button>
);

export default Action;
