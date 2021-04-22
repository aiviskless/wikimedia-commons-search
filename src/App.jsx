import './App.css';
import React, {
  Children, useEffect, useRef, useState,
} from 'react';
import WBK from 'wikibase-sdk';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import SPARQLQueryDispatcher from './utils/SPARQLQueryDispatcher';
import SearchResultOption from './components/SearchResultOption';
import MediaBox from './components/MediaBox';
import {
  MEDIA_LIMIT, MEDIA_LIMIT_IN_PAGE, TIMEOUT_FOR_SEARCH, WCQS_ENDPOINT,
} from './consts';

const wdk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql',
});

function App() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [inputSearchResults, setInputSearchResults] = useState([]);
  const [entityMediaResults, setEntityMediaResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const [page, setPage] = useState(1);

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  const timer = useRef(null);

  const handleOnClick = (id) => {
    setEntityMediaResults([]);
    setPage(1);

    const sparqlQuery = `
      SELECT ?file ?image ?fileLabel ?thumb WHERE {
        ?file wdt:P180 wd:${id} .
        ?file schema:contentUrl ?url .
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=350")) AS ?image)
      } limit ${MEDIA_LIMIT}
    `;

    const queryDispatcher = new SPARQLQueryDispatcher(WCQS_ENDPOINT);

    queryDispatcher.query(sparqlQuery).then((data) => {
      if (data.results.bindings.length === 0) {
        setNoResults(true);
      } else {
        setEntityMediaResults(data.results.bindings);
        setNoResults(false);
      }
    });
  };

  console.log(entityMediaResults, 'entityMediaResults', inputSearchResults);

  const indexOfLastTodo = page * MEDIA_LIMIT_IN_PAGE;
  const indexOfFirstTodo = indexOfLastTodo - MEDIA_LIMIT_IN_PAGE;

  useEffect(() => {
    if (inputValue === '') {
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
  }, [inputValue]);

  return (
    <div className="App">
      <Box width={500}>
        <Autocomplete
          id="autocomplete"
          // freeSolo
          // autoComplete
          options={inputSearchResults}
          renderOption={(option) => (
            <SearchResultOption onClick={() => handleOnClick(option.id)} option={option} />
          )}
          // eslint-disable-next-line no-shadow
          getOptionSelected={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.label}
          loading={loading}
          filterOptions={(x) => x}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Wikimedia Commons"
              margin="normal"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>

      {entityMediaResults.length > 0 && (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {Children.toArray(
            entityMediaResults.slice(indexOfFirstTodo, indexOfLastTodo).map((result) => (
              <MediaBox data={result} />
            )),
          )}
        </Box>
      )}

      {noResults && <Typography>No results...</Typography>}

      {entityMediaResults.length > 0 && (
        <Pagination
          count={Math.ceil(entityMediaResults.length / MEDIA_LIMIT_IN_PAGE)}
          page={page}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default App;

// useEffect(() => {
//   // WIKIMEDIA API THINGY
//   const url = 'https://api.wikimedia.org/feed/v1/wikipedia/en/featured/2021/04/02';
//   fetch(url, {
//     headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
//   })
//     .then((response) => response.json())
//     .then(console.log);

// }, []);
