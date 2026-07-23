import type { TooltipProps } from '@mui/material';
import { Tooltip, Typography, styled, tooltipClasses } from '@mui/material';
import type { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement;
  title: string;
  description?: string;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} leaveDelay={250} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#00000099',
    position: 'relative',
  },
}));

const ActionTooltip: FC<Props> = ({ children, title, description }) => {
  return (
    <HtmlTooltip
      title={
        <>
          <Typography variant="subtitle1">{title}</Typography>
          {!!description && <Typography variant="caption" dangerouslySetInnerHTML={{ __html: description }} />}
        </>
      }
    >
      {children}
    </HtmlTooltip>
  );
};

export default ActionTooltip;
