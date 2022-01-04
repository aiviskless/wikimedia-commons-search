import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minHeight: 36,
  },

  tab: {
    padding: 0,
    minHeight: 32,
    minWidth: 85,
    fontSize: 12,
    textTransform: 'capitalize',

    '& .MuiTab-wrapper': {
      flexDirection: 'row',

      '& .MuiSvgIcon-root': {
        margin: '0 4px 0 0',
      },
    },
  },

  icon: {
    fontSize: 20,
  },
});

const MediaTypeTabs = ({ setTab, tab }) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const TABS = [
    {
      label: 'All',
      icon: <SearchOutlinedIcon className={classes.icon} />,
    },
    {
      label: 'Images',
      icon: <ImageOutlinedIcon className={classes.icon} />,
    },
    {
      label: 'Video',
      icon: <VideocamOutlinedIcon className={classes.icon} />,
    },
    {
      label: 'Audio',
      icon: <AudiotrackIcon className={classes.icon} />,
    },
  ];

  return (
    <Tabs
      value={tab}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      className={classes.root}
    >
      {TABS.map(({ label, icon }) => (
        <Tab key={label} className={classes.tab} label={label} icon={icon} />
      ))}
    </Tabs>
  );
};

export default MediaTypeTabs;
