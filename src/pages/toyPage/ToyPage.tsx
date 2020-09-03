import React, { useEffect, useState, ChangeEvent } from 'react';
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
import { getToy, addToBag, updateBag } from '../../redux/action/actions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Toy } from '../../redux/reducers/reducer';
import { State } from '../../types/types';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyle = makeStyles({
  imgContainer: {
    maxWidth: '700px',
    margin: 'auto',
  },
  toyDescription: {
    margin: '0 10px',
  },
  buyComponents: {
    width: '100%',
    margin: 'auto',
    marginTop: '30px',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
  },
  backButton: {
    position: 'absolute',
    right: '15%',
    top: '70px',
  },
});

type Props = {
  toy: Toy;
  isLoadingSingle: boolean;
  getToy: (id: string) => Promise<void>;
  addToBag: (id: string, amount: number) => Promise<void>;
  updateBag: (id: string, amount: number) => Promise<void>;
  match: {
    params: {
      id: string;
    };
  };
  purchases: Toy[];
};

const ToyPage = (props: Props) => {
  const {
    toy,
    isLoadingSingle,
    getToy,
    match,
    purchases,
    addToBag,
    updateBag,
  } = props;
  const [amount, setAmount] = useState(1);
  const classes = useStyle();

  useEffect(() => {
    getToy(match.params.id);
  }, [getToy, match.params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.currentTarget.value, 10) >= toy.amounts) {
      setAmount(toy.amounts);
    } else {
      setAmount(parseInt(e.currentTarget.value, 10));
    }
  };
  const handleClick = () => {
    const id = toy._id;
    if (!purchases.find((purchase: Toy) => purchase._id === toy._id)) {
      if (localStorage.getItem('bag')) {
        const prevBag = JSON.parse(localStorage.getItem('bag') || '');
        localStorage.setItem(
          'bag',
          JSON.stringify([...prevBag, { id, amount }])
        );
      } else {
        localStorage.setItem('bag', JSON.stringify([{ id, amount }]));
      }
      addToBag(id, amount);
    } else {
      const prevBag = JSON.parse(localStorage.getItem('bag') || '');
      const newBag = prevBag.map((element: { id: string; amount: number }) => {
        if (element.id === id) {
          if (element.amount + amount >= toy.amounts) {
            updateBag(id, toy.amounts);
            return { ...element, amount: toy.amounts };
          } else {
            updateBag(id, element.amount + amount);
            return { ...element, amount: element.amount + amount };
          }
        } else return element;
      });
      localStorage.setItem('bag', JSON.stringify(newBag));
    }
  };

  if (isLoadingSingle) {
    return (
      <Container className={classes.progressContainer}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Link to="/catalog">
        <Box className={classes.backButton}>
          <ArrowBackIcon fontSize="large" />
        </Box>
      </Link>
      <Box mt="50px">
        <Grid container justify="center">
          <Grid item>
            <Grid container>
              <Grid item xl={7} lg={7} md={5} sm={12} xs={12}>
                <Box className={classes.imgContainer}>
                  <Carousel autoPlay>
                    {toy.imageUrl?.map((oneImage) => (
                      <img
                        alt=""
                        height="auto"
                        src={oneImage}
                        key={Math.random()}
                      />
                    ))}
                  </Carousel>
                </Box>
              </Grid>
              <Grid
                item
                xl={3}
                lg={3}
                md={5}
                sm={12}
                xs={12}
                className={classes.toyDescription}
              >
                <Typography variant="h2" paragraph>
                  {toy.title}
                </Typography>
                <Typography
                  variant="h4"
                  paragraph
                  component="h2"
                >{`${toy.price} $`}</Typography>
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

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="500px"
                  mb={20}
                  className={classes.buyComponents}
                >
                  <Typography variant="h6" component="h2">
                    Quantity
                  </Typography>
                  <TextField
                    type="Number"
                    value={amount}
                    inputProps={{ min: '1', max: `${toy.amounts}`, size: '2' }}
                    onChange={handleChange}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.buyComponents}
                  onClick={handleClick}
                >
                  Add to bag
                </Button>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.buyComponents}
                >{`${toy.amounts} in stock`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const mapStateToProps = (state: State) => ({
  toy: state.toy,
  isLoadingSingle: state.isLoadingSingle,
  purchases: state.purchases,
});
const mapDispatchToProps = {
  getToy,
  addToBag,
  updateBag,
};
export default connect(mapStateToProps, mapDispatchToProps)(ToyPage);
