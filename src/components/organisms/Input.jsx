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
import { useHistory, useParams } from 'react-router';
import SearchResultOption from '../molecules/SearchResultOption';
import {
  COMMONS_URL,
  DEFAULT_MEDIA_LIMIT,
  SEPERATOR,
  TIMEOUT_FOR_SEARCH,
  WCQS_ENDPOINT,
  WDQS_ENDPOINT,
  WIKIDATA_URL,
} from '../../consts';
import SearchSettings from './SearchSettings';
import getMediaSparlq from '../../utils/getMediaSparql';
import getMediaSubclassSparlq from '../../utils/getMediaSubclassSparql';
import OutOfService from '../atoms/OutOfService';

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

  errorWrapper: {
    width: 'fit-content',
    margin: '0 auto',
    marginTop: 16,
  },
});

const Input = ({
  setNoResults = () => {},
  setEntityMediaResults = () => {},
  setResultsLoading = () => {},
  setSubsearchLoading = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputSearchResults, setInputSearchResults] = useState([]);
  const [outOfService, setOutOfService] = useState(false);

  // settings
  const [includeSubclassSearch, setIncludeSubclassSearch] = useState(true);
  const [mediaLimit, setMediaLimit] = useState(DEFAULT_MEDIA_LIMIT);

  const params = useParams();
  const history = useHistory();

  const timer = useRef(null);

  const classes = useStyles();

  const getSubclassQueryMediaLimit = (currentMediaCount, currentLimit) => {
    if (currentMediaCount >= currentLimit) return 0;
    return currentLimit - currentMediaCount;
  };

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
    setSubsearchLoading(true);
    setOutOfService(false);
    let newEntityMediaResults = [];
    let url;

    // define first query
    let sparqlQuery = getMediaSparlq(mediaLimit, searchValue);

    url = wc.sparqlQuery(sparqlQuery);

    fetch(url).then((response) => response.json()).then((data) => {
      newEntityMediaResults = newEntityMediaResults.concat(data.results.bindings);
      setNoResults(false);

      setEntityMediaResults([...newEntityMediaResults]);

      if (!includeSubclassSearch) {
        if (newEntityMediaResults.length === 0) setNoResults(true);
        setResultsLoading(false);
        setSubsearchLoading(false);
        return true;
      }

      if (newEntityMediaResults.length > 0) setResultsLoading(false);
      // TODO: DUPLICATESSSS HERE IN DEPICTS???
      // define query that searches for subclasses as well
      sparqlQuery = getMediaSubclassSparlq(
        getSubclassQueryMediaLimit(newEntityMediaResults.length, mediaLimit), searchValue,
      );

      url = wc.sparqlQuery(sparqlQuery);
      // eslint-disable-next-line no-shadow
      fetch(url).then((response) => response.json()).then((data) => {
        newEntityMediaResults = newEntityMediaResults.concat(data.results.bindings);
        setEntityMediaResults([...newEntityMediaResults]);
        if (newEntityMediaResults.length === 0) setNoResults(true);
        setResultsLoading(false);
        setSubsearchLoading(false);
      // WC returns unreadable error messages
      }).catch(() => { setOutOfService(true); setResultsLoading(false); });

      return true;
    // WC returns unreadable error messages
    }).catch(() => { setOutOfService(true); setResultsLoading(false); });

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

      {outOfService && <div className={classes.errorWrapper}><OutOfService /></div>}
    </div>
  );
};

export default Input;
