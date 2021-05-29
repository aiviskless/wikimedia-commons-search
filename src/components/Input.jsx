import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import WBK from 'wikibase-sdk';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  CircularProgress, makeStyles,
} from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import { useHistory, useParams } from 'react-router';
import SearchResultOption from './SearchResultOption';
import {
  COMMONS_URL,
  DEFAULT_MEDIA_LIMIT,
  SEPERATOR,
  TIMEOUT_FOR_SEARCH,
  WCQS_ENDPOINT,
  WDQS_ENDPOINT,
  WIKIDATA_URL,
} from '../consts';
import SearchSettings from './SearchSettings';

const wd = WBK({
  instance: WIKIDATA_URL,
  sparqlEndpoint: WDQS_ENDPOINT,
});

export const wc = WBK({
  instance: COMMONS_URL,
  sparqlEndpoint: WCQS_ENDPOINT,
});

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  autocomplete: {
    width: '100%',
  },

  searchSettingsWrapper: {
    marginRight: 8,
  },
});

const Input = ({
  setNoResults = () => {},
  setEntityMediaResults = () => {},
  setResultsLoading = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputSearchResults, setInputSearchResults] = useState([]);

  // settings
  const [includeSubclassSearch, setIncludeSubclassSearch] = useState(true);
  const [mediaLimit, setMediaLimit] = useState(DEFAULT_MEDIA_LIMIT);

  const params = useParams();
  const history = useHistory();

  const timer = useRef(null);

  const classes = useStyles();

  const handleOnValueChange = (event, newValue) => {
    setValue(newValue);
    if (newValue?.id) history.push(`/search/${newValue.id}${SEPERATOR}${newValue.label}`);
  };

  // useEffect for Commons search
  useEffect(() => {
    // e.g. /search/Q147;kitten
    if (!params?.data) {
      if (value) {
        history.push(`/search/${value.id}${SEPERATOR}${value.label}`);
      }
      return false;
    }

    const searchValues = params.data.split(SEPERATOR);

    const searchValue = searchValues[0];
    const searchLabel = searchValues[1];

    if (!searchValue || !searchLabel) return false;

    // if value comes from url change, sync input value
    if (searchLabel !== inputValue) {
      fetch(wd.searchEntities(searchLabel))
        .then((response) => response.json())
        .then((data) => {
          setInputSearchResults(data.search);
          setValue(data.search.find((d) => d.id === searchValue));
        });
    }

    setEntityMediaResults([]);
    setResultsLoading(true);
    let newEntityMediaResults = [];
    let url;

    // define first query
    let sparqlQuery = `
      SELECT ?file ?fileLabel ?thumb ?fileOrig ?encoding ?creator (GROUP_CONCAT(?depictID; separator = '${SEPERATOR}') AS ?depictIDs) (GROUP_CONCAT(?depictLabel; separator = '${SEPERATOR}') AS ?depictLabels)
      WITH {  
          SELECT ?file ?fileLabel ?thumb ?fileOrig ?encoding ?creator WHERE {
            ?file wdt:P180 wd:${searchValue} .
            ?file schema:contentUrl ?url .
            ?file schema:encodingFormat ?encoding .
            
            OPTIONAL { ?file p:P170/pq:P4174 ?creator . }
      
            SERVICE wikibase:label {
              bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
              ?file rdfs:label ?fileLabel.
            }
      
            bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=${isMobile ? 100 : 200}")) AS ?thumb)
            bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)))) AS ?fileOrig)
          } limit ${mediaLimit}
      } as %files
      
      WITH {
        SELECT ?file ?depict WHERE {
          INCLUDE %files .
          ?file wdt:P180 ?depict .
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
      } GROUP BY ?file ?fileLabel ?thumb ?fileOrig ?encoding ?creator
    `;

    url = wc.sparqlQuery(sparqlQuery);

    fetch(url).then((response) => response.json()).then((data) => {
      newEntityMediaResults = newEntityMediaResults.concat(data.results.bindings);
      setNoResults(false);

      setEntityMediaResults([...newEntityMediaResults]);

      if (!includeSubclassSearch) {
        if (newEntityMediaResults.length === 0) setNoResults(true);
        setResultsLoading(false);
        return true;
      }

      if (newEntityMediaResults.length > 0) setResultsLoading(false);
      // TODO: DUPLICATESSSS HERE IN DEPICTS???
      // define query that searches for subclasses as well
      sparqlQuery = `
        SELECT DISTINCT ?item ?itemLabel ?file ?thumb ?fileOrig ?fileLabel ?encoding ?creator (GROUP_CONCAT(?depictID; separator = '${SEPERATOR}') AS ?depictIDs) (GROUP_CONCAT(?depictLabel; separator = '${SEPERATOR}') AS ?depictLabels) WITH { 
          SELECT ?item ?itemLabel WHERE {
            SERVICE <https://query.wikidata.org/sparql> {
              ?item wdt:P31/wdt:P279* wd:${searchValue} .
              SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". ?item rdfs:label ?itemLabel . }
            }
          }
        } AS %Wikidataitems
  
        WITH {
          SELECT ?file ?thumb ?fileOrig ?fileLabel ?encoding ?creator {
            INCLUDE %Wikidataitems .
            ?file wdt:P180 ?item.
            ?file schema:contentUrl ?url .
            ?file schema:encodingFormat ?encoding .
  
            OPTIONAL {
              ?file p:P170/pq:P4174 ?creator .
            }
  
            SERVICE wikibase:label {
              bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en".
              ?file rdfs:label ?fileLabel.
            }

            bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=${isMobile ? 100 : 200}")) AS ?thumb)
            bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)))) AS ?fileOrig)
          } limit ${mediaLimit}
        } AS %files

        WITH {
          SELECT ?file ?depict WHERE {
            INCLUDE %files .
            ?file wdt:P180 ?depict .
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
                bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" .
                ?depict rdfs:label ?depictLabel .
              }
            }
          }
        } AS %depictLabels

        WHERE {
          INCLUDE %files .
          INCLUDE %top_file_depicts .
          INCLUDE %depictLabels .
        } GROUP BY ?item ?itemLabel ?file ?thumb ?fileOrig ?fileLabel ?encoding ?creator
      `;

      url = wc.sparqlQuery(sparqlQuery);
      // eslint-disable-next-line no-shadow
      fetch(url).then((response) => response.json()).then((data) => {
        newEntityMediaResults = newEntityMediaResults.concat(data.results.bindings);
        setEntityMediaResults([...newEntityMediaResults]);
        if (newEntityMediaResults.length === 0) setNoResults(true);
        setResultsLoading(false);
      });

      return true;
    });

    return true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeSubclassSearch, params]);

  // useEffect for input change and Wikidata search
  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (inputValue === '') {
      setNoResults(false);
      return false;
    }

    timer.current = setTimeout(() => {
      setLoading(true);
      const url = wd.searchEntities(inputValue);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setInputSearchResults(data.search);
          setLoading(false);
        });
    }, TIMEOUT_FOR_SEARCH);

    return true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className={classes.root}>
      <div className={classes.searchSettingsWrapper}>
        <SearchSettings
          setIncludeSubclassSearch={setIncludeSubclassSearch}
          includeSubclassSearch={includeSubclassSearch}
          setMediaLimit={setMediaLimit}
          mediaLimit={mediaLimit}
        />
      </div>

      <Autocomplete
        clearOnBlur={false}
        autoHighlight
        options={inputSearchResults}
        renderOption={(option) => <SearchResultOption option={option} />}
        // eslint-disable-next-line no-shadow
        getOptionSelected={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.label}
        loading={loading}
        filterOptions={(x) => x}
        value={value}
        size="small"
        onChange={handleOnValueChange}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        className={classes.autocomplete}
        // eslint-disable-next-line no-shadow
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter keyword"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {inputSearchResults.length > 0 ? params.InputProps.endAdornment : null}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default Input;
