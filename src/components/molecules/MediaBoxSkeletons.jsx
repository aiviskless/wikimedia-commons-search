import {
  Box,
  Card,
  CardActions,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Children } from 'react';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
  card: {
    margin: isMobile ? 8 : 16,
    width: isMobile ? 125 : 225,
  },
});

const MediaBoxSkeletons = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {Children.toArray([...Array(20)].map(() => (
        <Card className={classes.card}>
          <Skeleton variant="rect" width={225} height={160} />
          <CardContent>
            <Skeleton />

            <Skeleton width="60%" />

            <Box display="flex" mt={1} flexWrap="wrap">
              {Children.toArray([...Array(5)].map(() => (
                <Box m="0 2px 2px 0">
                  <Skeleton height={28} width={48} />
                </Box>
              )))}
            </Box>
          </CardContent>

          <CardActions>
            <Skeleton width={100} height={40} />
          </CardActions>
        </Card>
      )))}
    </Box>
  );
};

export default MediaBoxSkeletons;
