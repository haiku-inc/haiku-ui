import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { IconButton, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';

interface PeriodSelectorProps {
  startDate: string | null;
  endDate: string | null;
  defaultStartDate?: string;
  defaultEndDate?: string;
  onChangeStartDate: (startDate: string) => void;
  onChangeEndDate: (endDate: string) => void;
}

const DATE_FORMAT = 'YYYY-MM-DD';

const PeriodSelector: FC<PeriodSelectorProps> = ({
  startDate,
  endDate,
  defaultEndDate,
  defaultStartDate,
  onChangeStartDate,
  onChangeEndDate,
}) => {
  const [selectedPeriodYear, setSelectedPeriodYear] = useState<number | null>(null);
  const [selectedPeriodQuarter, setSelectedPeriodQuarter] = useState<1 | 2 | 3 | 4 | null>(null);

  const getSelectQuarterStart = (quarter: 1 | 2 | 3 | 4) => {
    switch (quarter) {
      case 1:
        return '01-01';
      case 2:
        return '04-01';
      case 3:
        return '07-01';
      case 4:
      default:
        return '10-01';
    }
  };
  const getSelectQuarterEnd = (quarter: 1 | 2 | 3 | 4) => {
    switch (quarter) {
      case 1:
        return '03-31';
      case 2:
        return '06-30';
      case 3:
        return '09-30';
      case 4:
      default:
        return '12-31';
    }
  };

  const handlePeriodChange = (year: number, quarter: 1 | 2 | 3 | 4) => {
    onChangeStartDate(`${year}-${getSelectQuarterStart(quarter)}`);
    onChangeEndDate(`${year}-${getSelectQuarterEnd(quarter)}`);
  };
  const handlePeriodReset = () => {
    onChangeStartDate(defaultStartDate || '');
    onChangeEndDate(defaultEndDate || '');
    setSelectedPeriodYear(null);
    setSelectedPeriodQuarter(null);
  };
  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedPeriodYear(Number(value));
    if (selectedPeriodQuarter && value) {
      handlePeriodChange(Number(value), selectedPeriodQuarter);
    }
  };
  const handleQuarterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedPeriodQuarter(Number(value) as 1 | 2 | 3 | 4);
    if (selectedPeriodYear && value) {
      handlePeriodChange(selectedPeriodYear, Number(value) as 1 | 2 | 3 | 4);
    }
  };

  const getYearsSince = (startYear: number) => {
    let currentYear = new Date().getFullYear();
    const years = [];
    while ((startYear || 1980) <= currentYear) {
      years.push(currentYear--);
    }
    return years;
  };

  return (
    <div className="flex flex-wrap gap-1">
      <TextField
        sx={{ width: '100px' }}
        select
        label="Year"
        size="small"
        value={selectedPeriodYear || ''}
        variant="outlined"
        onChange={handleYearChange}
      >
        <MenuItem value="">[manually]</MenuItem>
        {getYearsSince(2023).map((year) => {
          return (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          );
        })}
      </TextField>
      <TextField
        select
        sx={{ width: '100px' }}
        label="Quarter"
        size="small"
        value={selectedPeriodQuarter || ''}
        variant="outlined"
        onChange={handleQuarterChange}
      >
        <MenuItem value="">[manually]</MenuItem>
        {['1 quarter', '2 quarter', '3 quarter', '4 quarter'].map((quarter, index) => {
          return (
            <MenuItem key={quarter} value={index + 1}>
              {quarter}
            </MenuItem>
          );
        })}
      </TextField>

      <DatePicker
        sx={{ width: '150px' }}
        label="Start date"
        slotProps={{ textField: { size: 'small' } }}
        value={startDate ? dayjs(startDate) : null}
        onChange={(newValue) => onChangeStartDate(newValue?.format(DATE_FORMAT) || '')}
      />
      <DatePicker
        sx={{ width: '150px' }}
        label="End date"
        slotProps={{ textField: { size: 'small' } }}
        value={endDate ? dayjs(endDate) : null}
        onChange={(newValue) => onChangeEndDate(newValue?.format(DATE_FORMAT) || '')}
      />

      {((startDate && startDate !== defaultStartDate) || (endDate && endDate !== defaultEndDate)) && (
        <IconButton aria-label="clear" onClick={handlePeriodReset} className="width-40 height-40" color="info">
          <CancelPresentationIcon />
        </IconButton>
      )}
    </div>
  );
};

export default PeriodSelector;
