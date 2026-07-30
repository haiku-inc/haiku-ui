import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState, type ChangeEventHandler, type FC } from 'react';
import SkeletonBlock from '../SkeletonBlock';

interface Props {
  label?: string;
  value?: string;
  hasValidation?: boolean;
  isValid?: boolean;
  isValidating?: boolean;
  onChange?: (value?: string) => void;
  isLoading?: boolean;
  helperText?: string;
}

const StateIcon: FC<{ level?: 'thinking' | 'unknown' | 'approved' | 'failed' }> = ({ level }) => {
  const attrs = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    style: { width: '24px', height: '24px' },
  };

  switch (level) {
    case 'unknown':
      return (
        <svg {...attrs}>
          <circle cx="12" cy="12" r="10" fill="none" stroke="var(--text-info)" stroke-width="2" />
          <path
            d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2.25-2.5 3v1.5"
            fill="none"
            stroke="var(--text-info)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="12" cy="17" r="1.5" fill="var(--text-info)" />
        </svg>
      );
    case 'approved':
      return (
        <svg
          {...attrs}
          fill="none"
          stroke="var(--text-success)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <defs>
            <mask id="circle-gap">
              <rect x="0" y="0" width="24" height="24" fill="white" />
              <path
                d="M9 12.5l3.5 3L20 4.5"
                stroke="black"
                stroke-width="6.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </mask>
          </defs>
          <circle cx="12" cy="12" r="10" mask="url(#circle-gap)" />
          <path d="M8 11.5l3.5 3.5L21 3.5" />
        </svg>
      );
    case 'failed':
      return (
        <svg {...attrs}>
          <circle cx="12" cy="12" r="10" fill="none" stroke="var(--text-error)" stroke-width="2" />
          <path d="M7 7L17 17M17 7L7 17" stroke="var(--text-error)" stroke-width="2" />
        </svg>
      );
    default:
      return (
        <svg {...attrs} fill="color-mix(in oklab, currentColor 80%, transparent)">
          <circle cx="4" cy="12" r="3" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="20" cy="12" r="3" />
        </svg>
      );
  }
};

const InputDebounced: FC<Props> = ({
  label,
  value,
  isLoading,
  onChange,
  helperText,
  hasValidation,
  isValid,
  isValidating,
}) => {
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>();
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
      onChange?.(inputValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue]);

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setInputValue(e.target.value);
  };

  if (isLoading) {
    return <SkeletonBlock width={200} height={40} isInner />;
  }

  return (
    <TextField
      label={label}
      variant="filled"
      margin="dense"
      className="w-full"
      value={inputValue || ''}
      onChange={handleChange}
      helperText={helperText}
      slotProps={{
        input:
          debouncedInputValue !== inputValue || hasValidation
            ? {
                endAdornment: (
                  <InputAdornment position="start">
                    {debouncedInputValue !== inputValue && <StateIcon level="thinking" />}
                    {!!inputValue &&
                      hasValidation &&
                      (debouncedInputValue === inputValue && isValidating ? (
                        <StateIcon level="unknown" />
                      ) : isValid ? (
                        <StateIcon level="approved" />
                      ) : (
                        <StateIcon level="failed" />
                      ))}
                  </InputAdornment>
                ),
              }
            : undefined,
      }}
      autoComplete="off"
    />
  );
};

export default InputDebounced;
