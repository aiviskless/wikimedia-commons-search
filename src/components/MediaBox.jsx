import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import ModalImage from 'react-modal-image';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { isMobile } from 'react-device-detect';
import ReactPlayer from 'react-player';
import { NOT_IMAGE_ENCODINGS } from '../consts';

const getFullsizeImage = (url) => url.split('?width')[0];

const getImageFilenameFromWDCFilePath = (url) => {
  const splitUrl = url.split('/');

  return getFullsizeImage(splitUrl[splitUrl.length - 1]);
};

const formatTitle = (title) => {
  if (title.length > 50) return `${title.substr(0, 50)}...`;
  return title;
};

const formatDesc = (desc) => {
  if (desc.length > 150) return `${desc.substr(0, 50)}...`;
  return desc;
};

const useStyles = makeStyles({
  root: {
    width: 'fit-content',
    height: 'fit-content',
    margin: 16,

    '& .MuiCardContent-root': {
      padding: 8,
    },

    '& .MuiCardActions-root': {
      padding: 4,
    },
  },

  title: {
    maxWidth: 'fit-content',
    wordBreak: 'break-all',
    fontSize: isMobile ? 12 : 14,
  },

  media: {
    textAlign: 'center',

    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover !important',
    },

    '& img:hover': {
      cursor: 'zoom-in !important',
    },

    '& div:first-child': {
      height: '100%',
    },
  },

  desc: {
    maxWidth: 'fit-content',
    fontSize: isMobile ? 10 : 12,
  },
});

const MediaBox = ({
  data: {
    thumb, fileLabel, file, encoding, fileOrig,
  },
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.media}>
        {/* <ModalImage
          small={image.value}
          large={getFullsizeImage(image.value)}
          alt={file.value}
        /> */}

        {NOT_IMAGE_ENCODINGS.includes(encoding.value) ? (
          <ReactPlayer
            controls
            url={fileOrig.value}
            height={isMobile ? 94 : 169}
            width={isMobile ? 125 : 225}
          />
        ) : (
          <LazyLoadImage
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
          {formatTitle(getImageFilenameFromWDCFilePath(fileOrig.value))}
        </Typography>

        {fileLabel?.['xml:lang'] && (
          <Typography
            color="textSecondary"
            className={classes.desc}
          >
            {formatDesc(fileLabel.value)}
          </Typography>
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
  );
};

export default MediaBox;
