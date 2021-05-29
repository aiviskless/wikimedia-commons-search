import React from 'react';
import { makeStyles } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import { Redirect, Route, Switch } from 'react-router';
import Search from './components/Search';
import User from './components/User';
import Home from './components/Home';

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
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search/:data">
        <div className={classes.root}>
          <Search />
        </div>
      </Route>
      <Route path="/user/:data">
        <div className={classes.root}>
          <User />
        </div>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
