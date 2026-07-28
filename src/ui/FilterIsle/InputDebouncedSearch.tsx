import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState, type ChangeEventHandler, type FC } from 'react';
import SearchActiveIcon from '../../assets/unicons/service/search-active.svg';
import SearchIcon from '../../assets/unicons/service/search.svg';
import SkeletonBlock from '../SkeletonBlock';

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
  isLoading?: boolean;
  helperText?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const InputDebouncedSearch: FC<Props> = ({
  value,
  isLoading,
  onChange,
  helperText,
  className,
  placeholder,
  disabled,
}) => {
  const [debouncedSearchName, setDebouncedSearchName] = useState<string>();
  const [searchName, setSearchName] = useState(value);

  useEffect(() => {
    setSearchName(value);
  }, [value]);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearchName(searchName);
      onChange?.(searchName);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchName]);

  const handleSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setSearchName(e.target.value);
  };

  if (isLoading) {
    return <SkeletonBlock width={200} height={40} isInner />;
  }

  return (
    <TextField
      label="Search"
      size="small"
      className={className}
      style={{ width: '200px' }}
      value={searchName || ''}
      onChange={handleSearch}
      helperText={helperText}
      placeholder={placeholder}
      disabled={disabled}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              {searchName !== debouncedSearchName ? (
                <SearchActiveIcon style={{ with: '20px', height: '20px', color: 'var(--tertiary)' }} />
              ) : (
                <SearchIcon style={{ with: '20px', height: '20px' }} />
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default InputDebouncedSearch;
