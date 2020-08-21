import React, { useEffect } from 'react';
import {
  Box,
  makeStyles,
  Grid,
  Typography,
  CardMedia,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getToy } from '../../redux/action/actions';

const useStyle = makeStyles({
  imgContainer: {
    maxWidth: '450px',
    margin: 'auto',
  },
});

const ToyPage = (props) => {
  const {
    toy, isLoadingSingle, getToy, match,
  } = props;
  const classes = useStyle();
  useEffect(() => {
    getToy(match.params.id);
  }, [getToy, match.params.id]);

  if (isLoadingSingle) {
    return (
      <Typography variant="h1" align="center">
        LOADING TOY
      </Typography>
    );
  }
  return (
    <Box ml="50px" mr="50px" mt="50px">
      <Grid container justify="center">
        <Grid item>
          <Grid container>
            <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
              <Box className={classes.imgContainer}>
                <CardMedia
                  component="img"
                  image={toy.imageUrl}
                  title={toy.title}
                  height="auto"
                  maxWidth="100%"
                />
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <Typography variant="h2" align="center" paragraph>
                {toy.title}
              </Typography>
              <Typography variant="h5" paragraph>
                {toy.body}
              </Typography>
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent ut metus at tortor maximus varius. Morbi hendrerit
                turpis quam, vitae pellentesque est gravida porta. Aenean a
                eros posuere, scelerisque tortor at, tincidunt lectus. Ut nunc
                erat, ornare imperdiet fringilla ac, malesuada vitae sem.
              </Typography>
              <Typography variant="body2" paragraph>
                Etiam ac massa interdum, laoreet massa vitae, egestas neque.
                Maecenas at erat purus. Aliquam finibus risus ex, a viverra
                orci hendrerit ac. Praesent molestie convallis sagittis.
                Pellentesque congue tellus in enim feugiat, id ullamcorper
                lorem laoreet. Vestibulum in congue lacus.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} m="auto">
          {}
        </Grid>
      </Grid>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  toy: state.toy,
  isLoadingSingle: state.isLoadingSingle,
});
const mapDispatchToProps = {
  getToy,
};
export default connect(mapStateToProps, mapDispatchToProps)(ToyPage);
