import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  Checkbox, FormControlLabel, IconButton, makeStyles, Popover, Tooltip, Typography,
} from '@material-ui/core';
import MediaLimitSlider from '../molecules/MediaLimitSlider';

const useStyles = makeStyles({
  popoverContent: {
    padding: '8px 16px',

    '& .MuiFormControlLabel-labelPlacementStart': {
      margin: 0,
    },
  },

  sliderWrapper: {
    marginTop: 16,
  },
});

const SearchSettings = ({
  setIncludeSubclassSearch,
  includeSubclassSearch,
  setMediaLimit,
  mediaLimit,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setIncludeSubclassSearch(event.target.checked);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const classes = useStyles();

  return (
    <div>
      <IconButton
        size="small"
        aria-describedby={id}
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.popoverContent}>
          <Tooltip
            interactive
            title={(
              <>
                <Typography>
                  <a href="https://www.wikidata.org/wiki/Property:P279" target="_blank" rel="noreferrer">
                    subclass of (P279)
                  </a>
                </Typography>
                <Typography variant="body2">
                  {/* eslint-disable-next-line max-len */}
                  Next higher class or type; all instances of these items are instances of those items; this item is a class (subset) of that item.
                </Typography>
              </>
            )}
          >
            <FormControlLabel
              value="start"
              checked={includeSubclassSearch}
              onChange={handleChange}
              control={<Checkbox size="small" />}
              label="Include subclass search"
              labelPlacement="start"
            />
          </Tooltip>

          <div className={classes.sliderWrapper}>
            <MediaLimitSlider
              setMediaLimit={setMediaLimit}
              mediaLimit={mediaLimit}
            />
          </div>
        </div>
      </Popover>
    </div>

  );
};

export default SearchSettings;
