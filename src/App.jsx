import React, { Children, useState } from 'react';
import {
  Box, makeStyles, Typography,
} from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import { Lightbox } from 'react-modal-image';
import MediaBox from './components/MediaBox';
import Input from './components/Input';

const useStyles = makeStyles({
  root: {
    padding: isMobile ? '10px' : '25px 50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function App() {
  const classes = useStyles();
  const [entityMediaResults, setEntityMediaResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);

  const closeLightbox = () => {
    setSelectedImage(false);
  };

  console.log(entityMediaResults, 'entityMediaResults');

  return (
    <div className={classes.root}>
      <Input setNoResults={setNoResults} setEntityMediaResults={setEntityMediaResults} />

      {entityMediaResults.length > 0 && (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {Children.toArray(entityMediaResults.map((result) => (
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
}

export default App;
