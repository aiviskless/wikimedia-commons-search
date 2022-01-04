import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { MAX_MEDIA_LIMIT } from '../../consts';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 50,
  },
});

const MediaLimitSlider = ({ mediaLimit, setMediaLimit }) => {
  const classes = useStyles();

  const handleSliderChange = (event, newValue) => {
    if (newValue > MAX_MEDIA_LIMIT) return false;
    return setMediaLimit(newValue);
  };

  const handleInputChange = (event) => {
    if (Number(event.target.value) > MAX_MEDIA_LIMIT) return false;
    return setMediaLimit(event.target.value === '' ? '' : Number(event.target.value));
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Media limit
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof mediaLimit === 'number' ? mediaLimit : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            color="secondary"
            min={10}
            max={MAX_MEDIA_LIMIT}
            step={10}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={mediaLimit}
            margin="dense"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 10,
              max: MAX_MEDIA_LIMIT,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MediaLimitSlider;
