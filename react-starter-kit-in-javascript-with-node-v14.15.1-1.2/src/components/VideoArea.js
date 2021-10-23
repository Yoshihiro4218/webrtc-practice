import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import VideoLocal from './VideoLocal';
import VideoRemote from './VideoRemote';

const VideoArea = ({rtcClient}) => {
  if (rtcClient === null) return <></>;

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VideoLocal rtcClient={rtcClient}>xs=12 md=6</VideoLocal>
        </Grid>
        <Grid item xs={12} md={6}>
          <VideoRemote rtcClient={rtcClient}>xs=12 md=6</VideoRemote>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VideoArea;