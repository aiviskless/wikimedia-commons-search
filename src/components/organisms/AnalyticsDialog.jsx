import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { isMobile } from 'react-device-detect';
import { DialogContentText, makeStyles } from '@material-ui/core';
import DepictsValueTable from '../molecules/DepictsValueTable';

const useStyles = makeStyles({
  title: {
    paddingBottom: 0,
  },
});

const AnalyticsDialog = ({ open, handleClose, data }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
    >
      <DialogTitle className={classes.title}>Depicts value statistics</DialogTitle>
      <DialogContent>
        <DialogContentText>
          See what else is depicted in results
        </DialogContentText>
        <DepictsValueTable data={data} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalyticsDialog;
