import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import WBK from 'wikibase-sdk';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  CircularProgress, makeStyles,
} from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import SPARQLQueryDispatcher from '../utils/SPARQLQueryDispatcher';
import SearchResultOption from './SearchResultOption';
import {
  MEDIA_LIMIT, TIMEOUT_FOR_SEARCH, WCQS_ENDPOINT,
} from '../consts';
import SearchSettings from './SearchSettings';

const wdk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql',
});

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
  },

  autocomplete: {
    width: '100%',
  },

  searchSettingsWrapper: {
    marginRight: 8,
  },
});

const Input = ({ setNoResults, setEntityMediaResults }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputSearchResults, setInputSearchResults] = useState([]);

  // settings
  const [includeSubclassSearch, setIncludeSubclassSearch] = useState(true);

  const timer = useRef(null);

  const classes = useStyles();

  const searchCommons = useCallback((valueToSearch) => {
    if (!valueToSearch) return false;

    setEntityMediaResults([]);

    let newEntityMediaResults = [];

    // define first query
    let sparqlQuery = `
      SELECT ?file ?thumb ?fileOrig ?fileLabel ?encoding WHERE {
        ?file wdt:P180 wd:${valueToSearch.id} .
        ?file schema:contentUrl ?url .
        ?file schema:encodingFormat ?encoding .
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=${isMobile ? 100 : 200}")) AS ?thumb)
        bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)))) AS ?fileOrig)
      } limit ${MEDIA_LIMIT}
    `;

    const queryDispatcher = new SPARQLQueryDispatcher(WCQS_ENDPOINT);

    queryDispatcher.query(sparqlQuery).then((data) => {
      newEntityMediaResults = newEntityMediaResults.concat(data.results.bindings);
      setNoResults(false);

      setEntityMediaResults([...newEntityMediaResults]);

      if (!includeSubclassSearch) {
        if (newEntityMediaResults.length === 0) setNoResults(true);
        return true;
      }

      // define query that searches for subclasses as well
      sparqlQuery = `
        SELECT DISTINCT ?item ?itemLabel ?image ?file ?thumb ?fileOrig ?fileLabel ?encoding
        WITH 
        { SELECT ?item ?itemLabel WHERE
          { SERVICE <https://query.wikidata.org/sparql> 
            { ?item wdt:P31/wdt:P279* wd:${valueToSearch.id} .
              SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". ?item rdfs:label ?itemLabel .}
            }
          }
        } AS %Wikidataitems
  
        WHERE {
          INCLUDE %Wikidataitems .
          ?file wdt:P180 ?item.
          ?file schema:contentUrl ?url .
          ?file schema:encodingFormat ?encoding .
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
          bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=${isMobile ? 100 : 200}")) AS ?thumb)
          bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)))) AS ?fileOrig)
        } limit ${MEDIA_LIMIT}
      `;

      // eslint-disable-next-line no-shadow
      queryDispatcher.query(sparqlQuery).then((data) => {
        newEntityMediaResults = newEntityMediaResults.concat(data.results.bindings);
        setEntityMediaResults([...newEntityMediaResults]);
        if (newEntityMediaResults.length === 0) setNoResults(true);
      });

      return true;
    });

    return true;
  }, [includeSubclassSearch, setEntityMediaResults, setNoResults]);

  const handleOnValueChange = (event, newValue) => {
    setValue(newValue);
  };

  // search again on includeSubclassSearch
  useEffect(() => {
    searchCommons(value);
  }, [includeSubclassSearch, value, searchCommons]);

  useEffect(() => {
    if (inputValue === '') {
      setNoResults(false);
      return undefined;
    }

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setLoading(true);
      const url = wdk.searchEntities(inputValue);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setInputSearchResults(data.search);
          setLoading(false);
        });
    }, TIMEOUT_FOR_SEARCH);

    return true;
  }, [inputValue, setNoResults]);

  return (
    <div className={classes.root}>
      <div className={classes.searchSettingsWrapper}>
        <SearchSettings
          setIncludeSubclassSearch={setIncludeSubclassSearch}
          includeSubclassSearch={includeSubclassSearch}
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
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Commons..."
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