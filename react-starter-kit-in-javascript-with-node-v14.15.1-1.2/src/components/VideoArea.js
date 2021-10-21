import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import VideoLocal from './VideoLocal';
import VideoRemote from './VideoRemote';

const VideoArea = ({localPeerName, remotePeerName}) => {
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VideoLocal name={localPeerName}>xs=12 md=6</VideoLocal>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </Box>
  );
}

export default VideoArea;