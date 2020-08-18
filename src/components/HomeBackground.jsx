import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import background from "../img/background.jpg";

const useStyle = makeStyles({
  homeBackground: {
    width: "100%",
    height: "100vh",
    background: `url(${background}) no-repeat center /cover`,
    marginBottom: "40px",
    color: "#dededc",
  },
});

const HomeBackground = () => {
  const classes = useStyle();
  return (
    <Box className={classes.homeBackground}>
      <Typography className={classes.headingText} variant='h1' align='center'>
        TOYS SHOP
      </Typography>
    </Box>
  );
};

export default HomeBackground;
