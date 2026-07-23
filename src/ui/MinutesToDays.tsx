import { Typography } from '@mui/material';

interface MinutesToDaysProps {
  min: number;
  label?: string;
}

const MinutesToDays = ({ min, label }: MinutesToDaysProps) => {
  if (!min) {
    return (
      <Typography variant="body2">
        <span>00</span>
        <span className="text-(--primary)">M</span>
        {!!label && <span>{` (${label})`}</span>}
      </Typography>
    );
  }
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  return (
    <Typography variant="body2">
      <span>
        {day < 10 && 0}
        {day}
      </span>
      <span className="text-(--primary)">D</span>
      <span className="px-0.5">:</span>
      <span>
        {hour % 24 < 10 && 0}
        {hour % 24}
      </span>
      <span className="text-(--primary)">H</span>
      <span className="px-0.5">:</span>
      <span>
        {min % 60 < 10 && 0}
        {min % 60}
      </span>
      <span className="text-(--primary)">M</span>
      {!!label && <span>{` (${label})`}</span>}
    </Typography>
  );
};

export default MinutesToDays;
