import React from 'react';
import { makeStyles } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import { Redirect, Route, Switch } from 'react-router';
import Search from './components/Search';
import User from './components/User';
import Input from './components/Input';

const useStyles = makeStyles({
  root: {
    padding: isMobile ? '20px 10px' : '25px 50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/" component={Input} />
        <Route path="/search/:data" component={Search} />
        <Route path="/user/:data" component={User} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
