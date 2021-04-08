import { Box, Typography } from '@material-ui/core';
import React from 'react';

const SearchResultOption = ({ onClick, option }) => (
  <Box display="flex" flexDirection="column" onClick={() => onClick(option.id)}>
    <Box>{option.label}</Box>
    <Typography variant="caption">{option.description}</Typography>
  </Box>
);

export default SearchResultOption;
