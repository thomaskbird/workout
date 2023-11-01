import React from 'react';
import {Grid} from '@mui/material';
import styles from './VideoPlayer.module.scss';

type VideoPlayerProps = {
  url: string;
  thumbnail: string;
}

const VideoPlayer = ({ url, thumbnail }: VideoPlayerProps) => {

  const videoConfig = {
    autoPlay: false,
    muted: false,
    preload: 'auto',
    controls: true,
    poster: thumbnail,
  };

  return (
    <Grid className={styles.root}>
      <video {...videoConfig}>
        <source src={url} type="video/mp4" />
      </video>
    </Grid>
  )
}

export default VideoPlayer;
