import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const MediaBox = ({ data }) => (
  <Box width={375} m={2}>
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={data.file.value}
          height="225"
          image={data.image.value}
          title="Temporary title"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Temporary title
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Temporary description
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  </Box>
);

export default MediaBox;
