import React, { Children, useState } from 'react';
import {
  Box, CircularProgress, makeStyles, Typography,
} from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import { Lightbox } from 'react-modal-image';
import MediaBox from './components/MediaBox';
import Input from './components/Input';
import MediaTypeTabs from './components/MediaTypeTabs';
import {
  ALL_TAB, AUDIO_FILE_EXTS, AUDIO_TAB, IMAGES_TAB, IMAGE_FILE_EXTS, VIDEO_FILE_EXTS, VIDEO_TAB,
} from './consts';
import getFilenameExtension from './utils/getFilenameExtension';
import getFilenameFromWDCFilePath from './utils/getFilenameFromWDCFilePath';

const useStyles = makeStyles({
  root: {
    padding: isMobile ? '20px 10px' : '25px 50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  inputWrapper: {
    marginBottom: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  loadingWrapper: {
    position: 'absolute',
    top: '50%',
  },

  count: {
    marginTop: 12,
  },

  wrapper: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const App = () => {
  const classes = useStyles();
  const [entityMediaResults, setEntityMediaResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(ALL_TAB);

  const closeLightbox = () => {
    setSelectedImage(false);
  };

  const filterResults = () => {
    const filterExts = (files, extensions) => files.filter((media) => (
      extensions.includes(
        getFilenameExtension(getFilenameFromWDCFilePath(media.fileOrig.value)),
      )
      || extensions.includes(
        getFilenameExtension(getFilenameFromWDCFilePath(media.fileOrig.value.toLowerCase())),
      )
    ));

    switch (tab) {
      case IMAGES_TAB:
        return filterExts(entityMediaResults, IMAGE_FILE_EXTS);
      case VIDEO_TAB:
        return filterExts(entityMediaResults, VIDEO_FILE_EXTS);
      case AUDIO_TAB:
        return filterExts(entityMediaResults, AUDIO_FILE_EXTS);
      default:
        return entityMediaResults;
    }
  };

  const filteredResults = filterResults();

  console.log(entityMediaResults, 'entityMediaResults');
  console.log(filteredResults);
  return (
    <div className={classes.root}>
      <div className={classes.inputWrapper}>
        <Input
          setNoResults={setNoResults}
          setEntityMediaResults={setEntityMediaResults}
          setResultsLoading={setLoading}
        />
        {entityMediaResults.length > 0 && (
          <div className={classes.wrapper}>
            <MediaTypeTabs setTab={setTab} tab={tab} />
            <small className={classes.count}>{`${filteredResults.length} results`}</small>
          </div>
        )}
      </div>

      {loading && (
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      )}

      {filteredResults.length > 0 && (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {Children.toArray(filteredResults.map((result) => (
            <MediaBox data={result} onClick={() => setSelectedImage(result)} />
          )))}
        </Box>
      )}

      {noResults && <Typography>No results...</Typography>}

      {selectedImage && (
        <Lightbox
          large={selectedImage.fileOrig.value}
          alt={selectedImage.file.value}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
};

export default App;
