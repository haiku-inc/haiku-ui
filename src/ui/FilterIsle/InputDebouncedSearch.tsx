import SkeletonBlock from '@/ui/SkeletonBlock';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState, type ChangeEventHandler, type FC } from 'react';

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
      className={`w-50 ${className || ''}`}
      value={searchName || ''}
      onChange={handleSearch}
      helperText={helperText}
      placeholder={placeholder}
      disabled={disabled}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              {searchName !== debouncedSearchName ? <FindReplaceIcon color="info" /> : <SearchIcon />}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default InputDebouncedSearch;
