import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { isMobile } from 'react-device-detect';
import DepictsValueTable from './DepictsValueTable';

const AnalyticsDialog = ({ open, handleClose, data }) => (
  <Dialog
    fullWidth
    maxWidth="sm"
    open={open}
    onClose={handleClose}
    fullScreen={isMobile}
  >
    <DialogTitle id="max-width-dialog-title">Depicts value statistics</DialogTitle>
    <DialogContent>
      {/* <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText> */}
      <DepictsValueTable data={data} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default AnalyticsDialog;
