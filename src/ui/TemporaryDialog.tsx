import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useRef, useState, type FC, type ReactElement } from 'react';
import { enterKeyDown } from '../utils/keyboard';

interface Props {
  title: string;
  children: ReactElement;
  seconds: number;
  onClose: () => void;
}

const TemporaryDialog: FC<Props> = ({ seconds, title, children, onClose }) => {
  const [dialogTimer, setDialogTimer] = useState(seconds);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Timer effect for auto-closing dialog
  useEffect(() => {
    if (dialogTimer > 0) {
      timerRef.current = setInterval(() => {
        setDialogTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      onClose();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [dialogTimer]);

  return (
    <Dialog open onClose={onClose} onKeyDown={enterKeyDown(onClose)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color="info" onClick={onClose} autoFocus>
          Got it!
          <span className="normal-case ml-3 tabular-nums! font-[--text-mono]!">{`(${dialogTimer}s)`}</span>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemporaryDialog;
