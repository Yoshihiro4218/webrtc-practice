import * as React from 'react';
import Video from './Video';

const VideoRemote = ({name}) => {
  const videoRef = null;
  // const currentVideoRef = videoRef.current;

  return <Video isLocal={false} name={name} videoRef={videoRef}/>;
};

export default VideoRemote;