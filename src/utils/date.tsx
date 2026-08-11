import { EMPTY_VALUE_FILLER } from '../constants/general';

const formatAmount = (amount: number, unit: string, stripped: boolean) =>
  `${amount}${stripped ? '' : ' '}${unit}${amount === 1 ? '' : 's'}`;

export const formatRelativeTime = (value?: string | null, stripped = false) => {
  if (!value) return EMPTY_VALUE_FILLER;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return EMPTY_VALUE_FILLER;

  const diffMs = Date.now() - date.getTime();
  const absDiffMs = Math.abs(diffMs);
  const seconds = Math.floor(absDiffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return <span title={date.toLocaleTimeString()}>{!stripped && 'just '}now</span>;
  }

  if (minutes < 60) {
    return (
      <span title={date.toLocaleTimeString()}>
        {formatAmount(minutes, !stripped ? 'minute' : 'min', stripped)}
        {!stripped ? (diffMs < 0 ? ' from now' : ' ago') : ''}
      </span>
    );
  }

  if (hours < 24) {
    return (
      <span title={date.toLocaleTimeString()}>
        {formatAmount(hours, !stripped ? 'hour' : 'h', stripped)}
        {!stripped ? (diffMs < 0 ? ' from now' : ' ago') : ''}
      </span>
    );
  }

  if (days < 30) {
    return (
      <span title={date.toLocaleTimeString()}>
        {formatAmount(days, !stripped ? 'day' : 'd', stripped)}
        {!stripped ? (diffMs < 0 ? ' from now' : ' ago') : ''}
      </span>
    );
  }
  if (months < 12) {
    return (
      <span title={date.toLocaleTimeString()}>
        {formatAmount(months, !stripped ? 'month' : 'mo', stripped)}
        {!stripped ? (diffMs < 0 ? ' from now' : ' ago') : ''}
      </span>
    );
  }

  return (
    <span title={date.toLocaleTimeString()}>
      {formatAmount(years, !stripped ? 'year' : 'yr', stripped)}
      {!stripped ? (diffMs < 0 ? ' from now' : ' ago') : ''}
    </span>
  );
};
