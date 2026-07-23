import { Box, CircularProgress, Typography } from '@mui/material';
import type { FC } from 'react';

interface ProgressProps {
  value?: number;
  isLoading?: boolean;
}

const size = 50;
const thickness = 8;

const GradientCircularProgress: FC<ProgressProps> = ({ value, isLoading }) => (
  <>
    <svg width={0} height={0}>
      <defs>
        <linearGradient id="my_circular_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e01cd5" />
          <stop offset="100%" stopColor="#1CB5E0" />
        </linearGradient>
      </defs>
    </svg>
    <Box className="relative w-10 aspect-square flex justify-center items-center">
      <CircularProgress
        className="absolute"
        size={size}
        thickness={thickness}
        value={100}
        variant="determinate"
        sx={{
          color: 'var(--radial-gauge-back-filler)',
        }}
      />
      <CircularProgress
        className="absolute"
        size={size}
        thickness={thickness}
        value={value !== undefined ? value : 100}
        variant={!isLoading ? 'determinate' : 'indeterminate'}
        sx={{ 'svg circle': { stroke: 'url(#my_circular_gradient)' }, opacity: value !== undefined ? 1 : 0.3 }}
      />
      <Typography variant="caption" component="span" className="text-[0.5rem]! tabular-nums text-(--text-dimmed)">
        {value !== undefined ? `${Math.round(value)}%` : 'N/A'}
      </Typography>
    </Box>
  </>
);

export default GradientCircularProgress;
