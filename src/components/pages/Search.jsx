import React, { Children, useState } from 'react';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import { Lightbox } from 'react-modal-image';
import BarChartIcon from '@material-ui/icons/BarChart';
import MediaBox from '../molecules/MediaBox';
import Input from '../organisms/Input';
import MediaTypeTabs from '../molecules/MediaTypeTabs';
import {
  ALL_TAB, AUDIO_FILE_EXTS, AUDIO_TAB, IMAGES_TAB, IMAGE_FILE_EXTS, VIDEO_FILE_EXTS, VIDEO_TAB,
} from '../../consts';
import getFilenameExtension from '../../utils/getFilenameExtension';
import getFilenameFromWDCFilePath from '../../utils/getFilenameFromWDCFilePath';
import NoResults from '../atoms/NoResults';
import AnalyticsDialog from '../organisms/AnalyticsDialog';
import MediaBoxSkeletons from '../molecules/MediaBoxSkeletons';

const useStyles = makeStyles({
  resultCountWrapper: {
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',

    '& button': {
      transform: 'translateY(-2px)',
      marginLeft: 2,
    },
  },

  wrapper: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const Search = () => {
  const classes = useStyles();
  const [entityMediaResults, setEntityMediaResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subsearchLoading, setSubsearchLoading] = useState(false);
  const [tab, setTab] = useState(ALL_TAB);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Input
        setNoResults={setNoResults}
        setEntityMediaResults={setEntityMediaResults}
        setResultsLoading={setLoading}
        setSubsearchLoading={setSubsearchLoading}
      />

      {entityMediaResults.length > 0 && (
        <div className={classes.wrapper}>
          <MediaTypeTabs setTab={setTab} tab={tab} />

          <div className={classes.resultCountWrapper}>
            <small>{`${(loading || subsearchLoading) ? '...' : filteredResults.length} results`}</small>
            {filteredResults?.length > 9 && (
              <IconButton size="small" onClick={() => setOpen(true)}>
                <BarChartIcon />
              </IconButton>
            )}
          </div>
        </div>
      )}

      {loading && <MediaBoxSkeletons />}

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
