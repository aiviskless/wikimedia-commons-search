import React, { Children, useState, useEffect } from 'react';
import {
  Box, makeStyles, Typography, IconButton,
} from '@material-ui/core';
import { Lightbox } from 'react-modal-image';
import { useParams } from 'react-router';
import { isMobile } from 'react-device-detect';
import BarChartIcon from '@material-ui/icons/BarChart';
import MediaBox from './MediaBox';
import Input, { wc } from './Input';
import MediaTypeTabs from './MediaTypeTabs';
import {
  ALL_TAB,
  AUDIO_FILE_EXTS,
  AUDIO_TAB,
  IMAGES_TAB,
  IMAGE_FILE_EXTS,
  NO_DEPICT_VALUES,
  VIDEO_FILE_EXTS,
  VIDEO_TAB,
} from '../consts';
import getFilenameExtension from '../utils/getFilenameExtension';
import getFilenameFromWDCFilePath from '../utils/getFilenameFromWDCFilePath';
import NoResults from './NoResults';
import Loading from './Loading';
import AnalyticsDialog from './AnalyticsDialog';
import getUserMediaSparlq from '../utils/getUserMediaSparql';

const useStyles = makeStyles({
  inputWrapper: {
    marginBottom: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  count: {
    marginTop: 4,
  },

  wrapper: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  username: {
    marginTop: 12,
  },

  resultCountWrapper: {
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',

    '& button': {
      transform: 'translateY(-2px)',
      marginLeft: 2,
    },
  },
});

const Search = () => {
  const classes = useStyles();
  const [entityMediaResults, setEntityMediaResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(ALL_TAB);
  const [open, setOpen] = useState(false);

  const params = useParams();

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

  useEffect(() => {
    if (!params?.data) return false;

    setLoading(true);
    setNoResults(false);

    const sparqlQuery = getUserMediaSparlq(params?.data);

    fetch(wc.sparqlQuery(sparqlQuery)).then((response) => response.json()).then((data) => {
      if (data.results.bindings?.length) {
        setEntityMediaResults(data.results.bindings);
      } else {
        setNoResults(true);
      }

      setLoading(false);
    });

    return true;
  }, [params]);

  const filteredResults = filterResults();

  return (
    <>
      <div className={classes.inputWrapper}>
        <Input />
        {entityMediaResults.length > 0 && (
          <div className={classes.wrapper}>
            <MediaTypeTabs setTab={setTab} tab={tab} />
            <Typography variant="h6" className={classes.username}>{`User:${params.data} uploads`}</Typography>
            <div className={classes.resultCountWrapper}>
              <small>{`${filteredResults?.length} results`}</small>
              {filteredResults?.length > 9 && (
                <IconButton size="small" onClick={() => setOpen(true)}>
                  <BarChartIcon />
                </IconButton>
              )}
            </div>
          </div>
        )}
      </div>

      {loading && <Loading />}

      {filteredResults.length > 0 && (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {Children.toArray(filteredResults.map((result) => (
            <MediaBox data={result} onClick={() => setSelectedImage(result)} />
          )))}
        </Box>
      )}

      {noResults && <NoResults />}

      {selectedImage && (
        <Lightbox
          large={selectedImage.fileOrig.value}
          alt={selectedImage.file.value}
          onClose={closeLightbox}
        />
      )}

      <AnalyticsDialog
        open={open}
        handleClose={() => setOpen(false)}
        data={entityMediaResults}
      />
    </>
  );
};

export default Search;
