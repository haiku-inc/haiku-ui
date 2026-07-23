import { enterKeyDown } from '@/utils/keyboard';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';

interface Props {
  title: string;
  description: string;
  isStrict?: boolean;
  strictPhrase?: string;
  onConfirm: () => void;
  onCancel: () => void;
  labelConfirm?: string;
  labelCancel?: string;
}

const ConfirmDeletionDialog: FC<Props> = ({
  isStrict,
  strictPhrase,
  title,
  description,
  onConfirm,
  onCancel,
  labelConfirm = 'Confirm',
  labelCancel = 'Cancel',
}) => {
  const _strictPhrase = strictPhrase ? strictPhrase : 'DELETE';
  const [text, setText] = useState('');

  const handleConfirm = () => {
    if (isStrict && text !== _strictPhrase) {
      return;
    }
    onConfirm();
  };

  return (
    <Dialog open onClose={onCancel} onKeyDown={enterKeyDown(handleConfirm)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText dangerouslySetInnerHTML={{ __html: description }} />

        {isStrict && (
          <TextField
            variant="filled"
            margin="dense"
            label={`Type "${_strictPhrase}" here (case sensitive)`}
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={onCancel} autoFocus>
          {labelCancel}
        </Button>
        <Button color="error" onClick={handleConfirm} disabled={isStrict && text !== _strictPhrase}>
          {labelConfirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeletionDialog;
