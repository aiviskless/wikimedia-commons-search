import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import Input from '../organisms/Input';
import wdIcon from '../../assets/images/wd_ico.png';
import wcIcon from '../../assets/images/commons_ico.png';
import wd from '../../assets/images/wikidata.png';
import wc from '../../assets/images/wikimedia-commons.png';
import { WIKIDATA_URL, COMMONS_URL } from '../../consts';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: isMobile ? '20px 10px' : '25px 50px',
    backgroundColor: '#fff',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 2000 1500\'%3E%3Cdefs%3E%3Crect stroke=\'%23ffffff\' stroke-width=\'0.9\' width=\'1\' height=\'1\' id=\'s\'/%3E%3Cpattern id=\'a\' width=\'3\' height=\'3\' patternUnits=\'userSpaceOnUse\' patternTransform=\'scale(45.5) translate(-978.02 -733.52)\'%3E%3Cuse fill=\'%23fafafa\' href=\'%23s\' y=\'2\'/%3E%3Cuse fill=\'%23fafafa\' href=\'%23s\' x=\'1\' y=\'2\'/%3E%3Cuse fill=\'%23f5f5f5\' href=\'%23s\' x=\'2\' y=\'2\'/%3E%3Cuse fill=\'%23f5f5f5\' href=\'%23s\'/%3E%3Cuse fill=\'%23f0f0f0\' href=\'%23s\' x=\'2\'/%3E%3Cuse fill=\'%23f0f0f0\' href=\'%23s\' x=\'1\' y=\'1\'/%3E%3C/pattern%3E%3Cpattern id=\'b\' width=\'7\' height=\'11\' patternUnits=\'userSpaceOnUse\' patternTransform=\'scale(45.5) translate(-978.02 -733.52)\'%3E%3Cg fill=\'%23ebebeb\'%3E%3Cuse href=\'%23s\'/%3E%3Cuse href=\'%23s\' y=\'5\' /%3E%3Cuse href=\'%23s\' x=\'1\' y=\'10\'/%3E%3Cuse href=\'%23s\' x=\'2\' y=\'1\'/%3E%3Cuse href=\'%23s\' x=\'2\' y=\'4\'/%3E%3Cuse href=\'%23s\' x=\'3\' y=\'8\'/%3E%3Cuse href=\'%23s\' x=\'4\' y=\'3\'/%3E%3Cuse href=\'%23s\' x=\'4\' y=\'7\'/%3E%3Cuse href=\'%23s\' x=\'5\' y=\'2\'/%3E%3Cuse href=\'%23s\' x=\'5\' y=\'6\'/%3E%3Cuse href=\'%23s\' x=\'6\' y=\'9\'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id=\'h\' width=\'5\' height=\'13\' patternUnits=\'userSpaceOnUse\' patternTransform=\'scale(45.5) translate(-978.02 -733.52)\'%3E%3Cg fill=\'%23ebebeb\'%3E%3Cuse href=\'%23s\' y=\'5\'/%3E%3Cuse href=\'%23s\' y=\'8\'/%3E%3Cuse href=\'%23s\' x=\'1\' y=\'1\'/%3E%3Cuse href=\'%23s\' x=\'1\' y=\'9\'/%3E%3Cuse href=\'%23s\' x=\'1\' y=\'12\'/%3E%3Cuse href=\'%23s\' x=\'2\'/%3E%3Cuse href=\'%23s\' x=\'2\' y=\'4\'/%3E%3Cuse href=\'%23s\' x=\'3\' y=\'2\'/%3E%3Cuse href=\'%23s\' x=\'3\' y=\'6\'/%3E%3Cuse href=\'%23s\' x=\'3\' y=\'11\'/%3E%3Cuse href=\'%23s\' x=\'4\' y=\'3\'/%3E%3Cuse href=\'%23s\' x=\'4\' y=\'7\'/%3E%3Cuse href=\'%23s\' x=\'4\' y=\'10\'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id=\'c\' width=\'17\' height=\'13\' patternUnits=\'userSpaceOnUse\' patternTransform=\'scale(45.5) translate(-978.02 -733.52)\'%3E%3Cg fill=\'%23e5e5e5\'%3E%3Cuse href=\'%23s\' y=\'11\'/%3E%3Cuse href=\'%23s\' x=\'2\' y=\'9\'/%3E%3Cuse href=\'%23s\' x=\'5\' y=\'12\'/%3E%3Cuse href=\'%23s\' x=\'9\' y=\'4\'/%3E%3Cuse href=\'%23s\' x=\'12\' y=\'1\'/%3E%3Cuse href=\'%23s\' x=\'16\' y=\'6\'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id=\'d\' width=\'19\' height=\'17\' patternUnits=\'userSpaceOnUse\' patternTransform=\'scale(45.5) translate(-978.02 -733.52)\'%3E%3Cg fill=\'%23ffffff\'%3E%3Cuse href=\'%23s\' y=\'9\'/%3E%3Cuse href=\'%23s\' x=\'16\' y=\'5\'/%3E%3Cuse href=\'%23s\' x=\'14\' y=\'2\'/%3E%3Cuse href=\'%23s\' x=\'11\' y=\'11\'/%3E%3Cuse href=\'%23s\' x=\'6\' y=\'14\'/%3E%3C/g%3E%3Cg fill=\'%23e0e0e0\'%3E%3Cuse href=\'%23s\' x=\'3\' y=\'13\'/%3E%3Cuse href=\'%23s\' x=\'9\' y=\'7\'/%3E%3Cuse href=\'%23s\' x=\'13\' y=\'10\'/%3E%3Cuse href=\'%23s\' x=\'15\' y=\'4\'/%3E%3Cuse href=\'%23s\' x=\'18\' y=\'1\'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id=\'e\' width=\'47\' height=\'53\' patternUnits=\'userSpaceOnUse\' patternTransform=\'scale(45.5) translate(-978.02 -733.52)\'%3E%3Cg fill=\'%23F60\'%3E%3Cuse href=\'%23s\' x=\'2\' y=\'5\'/%3E%3Cuse href=\'%23s\' x=\'16\' y=\'38\'/%3E%3Cuse href=\'%23s\' x=\'46\' y=\'42\'/%3E%3Cuse href=\'%23s\' x=\'29\' y=\'20\'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id=\'f\' width=\'59\' height=\'71\' patternUnits=\'userSpaceOnUse\' patternTransform=\'scale(45.5) translate(-978.02 -733.52)\'%3E%3Cg fill=\'%23F60\'%3E%3Cuse href=\'%23s\' x=\'33\' y=\'13\'/%3E%3Cuse href=\'%23s\' x=\'27\' y=\'54\'/%3E%3Cuse href=\'%23s\' x=\'55\' y=\'55\'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id=\'g\' width=\'139\' height=\'97\' patternUnits=\'userSpaceOnUse\' patternTransform=\'scale(45.5) translate(-978.02 -733.52)\'%3E%3Cg fill=\'%23F60\'%3E%3Cuse href=\'%23s\' x=\'11\' y=\'8\'/%3E%3Cuse href=\'%23s\' x=\'51\' y=\'13\'/%3E%3Cuse href=\'%23s\' x=\'17\' y=\'73\'/%3E%3Cuse href=\'%23s\' x=\'99\' y=\'57\'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'url(%23a)\' width=\'100%25\' height=\'100%25\'/%3E%3Crect fill=\'url(%23b)\' width=\'100%25\' height=\'100%25\'/%3E%3Crect fill=\'url(%23h)\' width=\'100%25\' height=\'100%25\'/%3E%3Crect fill=\'url(%23c)\' width=\'100%25\' height=\'100%25\'/%3E%3Crect fill=\'url(%23d)\' width=\'100%25\' height=\'100%25\'/%3E%3Crect fill=\'url(%23e)\' width=\'100%25\' height=\'100%25\'/%3E%3Crect fill=\'url(%23f)\' width=\'100%25\' height=\'100%25\'/%3E%3Crect fill=\'url(%23g)\' width=\'100%25\' height=\'100%25\'/%3E%3C/svg%3E")',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  main: {
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },

  info: {
    color: theme.palette.text.primary,
    lineHeight: '200%',
    fontSize: 16,

    '& a': {
      textDecoration: 'none',
      margin: '0 3px',
      color: theme.palette.text.primary,

      '&:hover': {
        textDecoration: 'underline',
      },
    },

    '& img': {
      verticalAlign: 'middle',
      width: 27,
      margin: '0 2px',
    },
  },

  infoWrapper: {
    marginTop: 20,
  },

  inputWrapper: {
    width: isMobile ? 330 : 400,
    margin: '0 auto',
  },

  footer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    display: 'flex',
    alignItems: 'flex-end',

    '& img': {
      margin: '0 5px',
    },

    '& small': {
      marginRight: 5,
    },

    '& a': {
      display: 'flex',
      textDecoration: 'none',
      color: 'black',
    },
  },

  githubIconWrapper: {
    marginRight: 16,
    marginBottom: 2,

    '& svg': {
      fontSize: 20,
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div className={classes.inputWrapper}>
          <Input noBackground />
        </div>

        <div className={classes.infoWrapper}>
          <span className={classes.info}>
            <a href="/"><b>Wikimedia Commons Search</b></a>
            {' '}
            is a search and display engine for media files powered by
            <a href={WIKIDATA_URL} target="_blank" rel="noreferrer"><b>Wikidata</b></a>
            <img src={wdIcon} alt="Wikidata icon" />
            <span>and</span>
            <a href={COMMONS_URL} target="_blank" rel="noreferrer"><b>Wikimedia Commons</b></a>
            <img src={wcIcon} alt="Wikimedia Commons icon" />

            <Box mt={2}>
              Examples:
              {' '}
              <Link to="/search/Q10998;potato">potato 🍠</Link>
              ,
              <Link to="/search/Q39201;pet">pet 🐶</Link>
              ,
              <Link to="/search/Q318;galaxy">galaxy 🌌</Link>
            </Box>
          </span>
        </div>
      </div>

      <div className={classes.footer}>
        <div className={classes.githubIconWrapper}>
          <a href="https://github.com/aiviskless/wikimedia-commons-search" target="_blank" rel="noreferrer">
            <GitHubIcon />
          </a>
        </div>
        <small>Powered by</small>
        <a href={WIKIDATA_URL} target="_blank" rel="noreferrer">
          <img src={wd} alt="" />
        </a>
        <a href={COMMONS_URL} target="_blank" rel="noreferrer">
          <img src={wc} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Home;
