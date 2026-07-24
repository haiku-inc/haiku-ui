import { TablePagination } from '@mui/material';
import type { ChangeEvent, FC } from 'react';
import SkeletonBlock from '../SkeletonBlock';

type Props =
  | {
      isLoading: true;
      onPageChange?: undefined;
      onLimitChange?: undefined;
      count?: undefined;
      page?: undefined;
      limit?: undefined;
      limitOptions?: undefined;
    }
  | {
      isLoading?: undefined;
      onPageChange: (page: number) => void;
      onLimitChange: (limit: number) => void;
      count: number;
      page: number;
      limit: number;
      limitOptions?: number[];
    };

const Pagination: FC<Props> = ({ isLoading, onPageChange, onLimitChange, count, page, limit, limitOptions }) => {
  if (isLoading) {
    return <SkeletonBlock width={340} height={50} isInner className="rounded-t-none!" />;
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onLimitChange(parseInt(e.target.value, 10));
    onPageChange(0);
  };

  return (
    <div className="flex justify-end">
      <div className="bg-(--table-body) w-fit rounded-b-xl flex justify-between items-center">
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={limitOptions ? limitOptions : undefined}
        />
      </div>
    </div>
  );
};

export default Pagination;
