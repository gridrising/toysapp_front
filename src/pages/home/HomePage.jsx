import React, { useEffect } from "react";
import CardComponent from "../../components/CardComponent";
import HomeBackground from "../../components/HomeBackground";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { getToys } from "../../redux/action/actions";

const useStyle = makeStyles((theme) => ({
  cards: {
    maxWidth: "80%",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const HomePage = (props) => {
  const { toys, toysIsLoading, getToys } = props;
  const classes = useStyle();
  useEffect(() => {
    getToys();
  }, [getToys]);
  if (toysIsLoading) {
    return (
      <>
        <HomeBackground />
        <Typography variant='h2' align='center'>
          LOADING TOYS
        </Typography>
      </>
    );
  } else {
    return (
      <>
        <HomeBackground />
        <Typography variant='h3' align='center' gutterBottom={true}>
          Top sales
        </Typography>
        <div className={classes.cardsContainer}>
          <Grid
            className={classes.cards}
            container
            justify='center'
            spacing={3}
          >
            {toys.map((toy) => (
              <Grid key={toy._id} item>
                <CardComponent
                  id={toy._id}
                  title={toy.title}
                  imageURL={toy.image}
                  description={toy.body}
                  price={toy.price}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </>
    );
  }
};
const mapStateToProps = (state) => ({
  toys: state.toys,
  toysIsLoading: state.toysIsLoading,
});
const mapDispatchToProps = {
  getToys,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
