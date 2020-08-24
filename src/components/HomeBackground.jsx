import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import background from '../img/background.jpg';

const useStyle = makeStyles(() => ({
  homeBackground: {
    width: '100%',
    height: '100vh',
    marginBottom: '40px',
    background: `url(${background}) no-repeat center /cover`,
    color: '#dededc',
  },

}));

const HomeBackground = () => {
  const classes = useStyle();
  return (
    <Box className={classes.homeBackground} />
  );
};

export default HomeBackground;
