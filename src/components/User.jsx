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

    const sparqlQuery = `
      SELECT ?file ?fileLabel ?thumb ?fileOrig ?encoding (GROUP_CONCAT(?depictID; separator = ';') AS ?depictIDs) (GROUP_CONCAT(?depictLabel; separator = ';') AS ?depictLabels)
      WITH {
        SELECT ?file ?fileLabel ?thumb ?fileOrig ?encoding WHERE {
          BIND('${params?.data}' AS ?username) .
          ?file (p:P170/pq:P4174) ?username.
          
          ?file schema:contentUrl ?url .
          ?file schema:encodingFormat ?encoding .

          SERVICE wikibase:label {
            bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
            ?file rdfs:label ?fileLabel.
          }
    
          bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=${isMobile ? 100 : 200}")) AS ?thumb)
          bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)))) AS ?fileOrig)
        } LIMIT 1000
      } as %files
      
      WITH {
        SELECT ?file ?depict WHERE {
          INCLUDE %files .
          OPTIONAL { ?file wdt:P180 ?depict . }
          BIND(IF(BOUND(?depict), ?depict, "${NO_DEPICT_VALUES}") AS ?depict).
        }
      } AS %file_depicts
      
      WITH {
        SELECT ?file ?depict WHERE {
          INCLUDE %file_depicts .
        }
      } AS %top_file_depicts
      
      WITH {
        SELECT DISTINCT ?depict WHERE {
          INCLUDE %file_depicts .
        }
      } AS %distinct_depicts
      
      WITH {
        SELECT ?depict ?depictLabel ?depictID WHERE {
          INCLUDE %distinct_depicts .

          BIND(?depict as ?depictURL) .
          service wikibase:label {
            bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" .
            ?depictURL rdfs:label ?depictID .
          }

          service <https://query.wikidata.org/sparql> {
            service wikibase:label {
              bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
              ?depict rdfs:label ?depictLabel.
            }
          }
        }
      } AS %depictLabels
      
      WHERE {
        INCLUDE %files .
        INCLUDE %top_file_depicts .
        INCLUDE %depictLabels .
      } GROUP BY ?file ?fileLabel ?thumb ?fileOrig ?encoding
    `;

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
