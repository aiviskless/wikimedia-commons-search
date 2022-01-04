import React, { Children, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip, makeStyles } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { isMobile } from 'react-device-detect';
import ReactPlayer from 'react-player';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { NOT_IMAGE_ENCODINGS, NO_DEPICT_VALUES, SEPERATOR } from '../../consts';
import getFilenameFromWDCFilePath from '../../utils/getFilenameFromWDCFilePath';
import { wc } from '../organisms/Input';

const formatTitle = (title) => {
  if (title.length > 50) return `${title.substr(0, 50)}...`;
  return title;
};

const formatDesc = (desc) => {
  if (desc.length > 150) return `${desc.substr(0, 50)}...`;
  return desc;
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'fit-content',
    margin: isMobile ? 8 : 16,
    width: isMobile ? 125 : 225,

    '& .MuiCardContent-root': {
      padding: 8,
    },

    '& .MuiCardActions-root': {
      padding: 4,
    },
  },

  title: {
    wordBreak: 'break-all',
    fontSize: isMobile ? 12 : 14,
  },

  media: {
    '& img': {
      objectFit: 'cover !important',
    },

    '& img:hover': {
      cursor: 'zoom-in !important',
    },
  },

  desc: {
    fontSize: isMobile ? 10 : 12,
    marginBottom: 4,
  },

  creatorWrapper: {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      display: 'flex',
      alignItems: 'center',
      fontSize: 20,
      color: 'gray',
      transform: 'translateY(-2px)',
      marginRight: 4,
    },

    '& a': {
      fontSize: 12,
      textDecoration: 'none',
      color: theme.palette.text.secondary,

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },

  chipsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '8px 0',

    '& > div': {
      margin: 2,
      height: isMobile ? 16 : 20,
    },

    '& span': {
      fontSize: isMobile ? 10 : 11,
    },
  },
}));

const MediaBox = ({
  data: {
    thumb,
    fileLabel,
    file,
    encoding,
    fileOrig,
    itemLabel,
    creator,
    depictLabels,
    depictIDs,
  },
  onClick = () => {},
}) => {
  const [uploadCount, setUploadCount] = useState(0);
  const [visible, setVisible] = useState();

  const classes = useStyles();
  const history = useHistory();

  const handleOnClickDepict = (label, i) => {
    history.push(`/search/${depictIDs.value.split(SEPERATOR)[i]}${SEPERATOR}${label}`);
  };

  const handleOnVisibilityChange = (isVisible) => {
    if (isVisible) {
      setVisible(true);
    }
  };

  useEffect(() => {
    if (!creator || !visible) return false;

    const sparqlQuery = `
      SELECT (COUNT(?file) as ?count) WHERE {
        BIND("${creator.value}" AS ?username) .
        ?file (p:P170/pq:P4174) ?username;
      }
    `;

    fetch(wc.sparqlQuery(sparqlQuery)).then((response) => response.json()).then((data) => {
      if (data.results.bindings?.length) setUploadCount(data.results.bindings[0].count.value);
    });

    return true;
  }, [creator, visible]);

  return (
    <VisibilitySensor onChange={handleOnVisibilityChange} partialVisibility>
      <Card className={classes.root}>
        <div className={classes.media}>
          {NOT_IMAGE_ENCODINGS.includes(encoding.value) ? (
            visible && (
              <ReactPlayer
                controls
                url={fileOrig.value}
                height={isMobile ? 94 : 169}
                width={isMobile ? 125 : 225}
              />
            )
          ) : (
            <LazyLoadImage
              onClick={onClick}
              alt={file.value}
              effect="blur"
              src={thumb.value}
              height={isMobile ? 94 : 169}
              width={isMobile ? 125 : 225}
            />
          )}
        </div>

        <CardContent>
          <Typography className={classes.title} gutterBottom>
            {formatTitle(getFilenameFromWDCFilePath(fileOrig.value))}
          </Typography>

          {fileLabel?.['xml:lang'] ? (
            <Typography
              color="textSecondary"
              className={classes.desc}
            >
              {formatDesc(fileLabel.value)}
            </Typography>
          )
          // show Wikidata item description if file description unavailable
            : itemLabel?.value && (
            <Typography color="textSecondary" className={classes.desc}>
              {formatDesc(itemLabel.value)}
            </Typography>
            )}

          {depictLabels?.value && (
          <div className={classes.chipsWrapper}>
            {Children.toArray((
              depictLabels.value.split(SEPERATOR).filter((d) => d !== NO_DEPICT_VALUES)
            ).map((label, i) => (
              <Chip
                size="small"
                label={label}
                onClick={() => handleOnClickDepict(label, i)}
              />
            )))}
          </div>
          )}

          {creator && (
          <div className={classes.creatorWrapper}>
            <PersonIcon />
            <Link to={`/user/${creator.value}`}>
              {`${creator.value} (${uploadCount || '?'})`}
            </Link>
          </div>
          )}
        </CardContent>

        <CardActions>
          <Button
            size="small"
            color="primary"
            href={file.value}
            target="_blank"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </VisibilitySensor>
  );
};

export default MediaBox;
