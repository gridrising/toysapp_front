import React, { useEffect } from "react";
import CardComponent from "../../components/CardComponent";
import { Grid, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { getToys } from "../../redux/action/actions";

const useStyle = makeStyles((theme) => ({
  cards: {
    maxWidth: "80%",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
}));
const CatalogPage = (props) => {
  const { toys, toysIsLoading, getToys } = props;
  const classes = useStyle();
  useEffect(() => {
    getToys();
  }, [getToys]);
  return (
    <div className={classes.cardsContainer}>
      <Grid className={classes.cards} container justify='center' spacing={3}>
        {toys.map((toy) => (
          <Grid key={toy._id} item>
            <CardComponent
              id={toy._id}
              title={toy.title}
              imageURL={toy.imageUrl}
              description={toy.body}
              price={toy.price}
              status={"Top sales"}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  toys: state.toys,
  toysIsLoading: state.toysIsLoading,
});
const mapDispatchToProps = {
  getToys,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
