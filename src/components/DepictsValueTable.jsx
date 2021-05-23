import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NO_DEPICT_VALUES, SEPERATOR } from '../consts';

const DepictsValueTable = ({ data }) => {
  const [depictStats, setDepictStats] = useState(null);

  useEffect(() => {
    const depicts = {};
    const filteredDepicts = {};

    // collect depict count
    data.forEach((d) => {
      const labels = d.depictLabels.value.split(SEPERATOR);

      labels.forEach((label) => {
        if (depicts[label]) {
          depicts[label] += 1;
        } else {
          depicts[label] = 1;
        }
      });
    });

    // remove depicts that are mentioned just once
    Object.keys(depicts).forEach((key) => {
      if (depicts[key] > 1 && key !== NO_DEPICT_VALUES) {
        filteredDepicts[key] = depicts[key];
      }
    });

    setDepictStats(filteredDepicts);
  }, [data]);

  if (!depictStats) return null;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Depicts label</b></TableCell>
            <TableCell align="right"><b>Occurrences</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(depictStats).sort(([, a], [, b]) => b - a).map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">{row[0]}</TableCell>
              <TableCell align="right">{row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DepictsValueTable;
