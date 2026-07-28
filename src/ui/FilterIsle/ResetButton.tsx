import type { FC, MouseEvent } from 'react';
import CloseIcon from '../../assets/unicons/service/close.svg';

interface Props {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const InputDebouncedSearch: FC<Props> = ({ onClick }) => (
  <button onClick={onClick} className="filter-isle-reset-button">
    <CloseIcon />
  </button>
);

export default InputDebouncedSearch;
