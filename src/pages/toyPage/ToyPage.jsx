import React, { useEffect } from 'react';
import {
  Box,
  makeStyles,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Button,
  TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { getToy } from '../../redux/action/actions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const useStyle = makeStyles({
  imgContainer: {
    maxWidth: '700px',
    margin: 'auto',
  },
  toyDescription:{
    margin:"0 10px"
  },
  buyComponents:{
    width:"100%",
    margin:"auto",
    marginTop:"30px",
  }
});

const ToyPage = (props) => {
  const {
    toy, isLoadingSingle, getToy, match,
  } = props;
  const classes = useStyle();

  useEffect(() => {
    getToy(match.params.id);
  }, [ getToy, match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoadingSingle) {
    return (
      <Container align="center"><CircularProgress /></Container>
    );
  }

  return (
    <Box mt="50px">
      <Grid container justify="center">
        <Grid item>
          <Grid container>
            <Grid item xl={7} lg={7} md={5} sm={12} xs={12}>
              <Box className={classes.imgContainer}>
                {/* <CardMedia
                  component="img"
                  image={toy.imageUrl}
                  title={toy.title}
                  height="auto"
                  maxWidth="100%"
                /> */}
                <Carousel autoPlay>
                  {toy.imageUrl?.map((oneImage) => (<img alt="" height="auto"
                  maxWidth="100%" src={oneImage} key={Math.random()}/>))}
                </Carousel>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={5} sm={12} xs={12} className={classes.toyDescription}>
              <Typography variant="h2"  paragraph>
                {toy.title}
              </Typography>
              <Typography variant="h4" paragraph component="h2">{`${toy.price} $`}</Typography>
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

              <form action="submit" onSubmit={handleSubmit}>
              
                <Box display="flex" justifyContent="space-between" alignItems="center" width="500px" mb={20} className={classes.buyComponents}>
                  <Typography variant="h6" component="h2">Quantity</Typography>
                  <TextField type="Number" defaultValue="1" inputProps={{ min: '1', max: `${toy.amounts}`, size: '2' }} />
                </Box>
                <Button type="submit" variant="contained" size="large" color="primary" className={classes.buyComponents}>Add to bag</Button>
                <Typography variant="h6" component="h2" className={classes.buyComponents}>{`${toy.amounts} in stock` }</Typography>
              </form>

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
