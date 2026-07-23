import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { IconButton } from '@mui/material';
import type { FC, MouseEvent } from 'react';

interface Props {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const InputDebouncedSearch: FC<Props> = ({ onClick }) => (
  <IconButton onClick={onClick} color="info">
    <CancelPresentationIcon className="w-6! h-6!" />
  </IconButton>
);

export default InputDebouncedSearch;
