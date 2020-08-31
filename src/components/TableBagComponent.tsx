import React from 'react';
import { Grid } from '@material-ui/core';
import { Toy } from '../types/types';
import ProductTableBagComponent from './ProductTableBagComponent';

type Props = {
  purchases: Toy[];
};

const TableBagComponent = (props: Props) => {
  const { purchases } = props;
  return (
    <Grid container>
      {purchases.map((purchase: Toy) => (
        <ProductTableBagComponent
          key={purchase._id}
          _id={purchase._id}
          price={purchase.price}
          amounts={purchase.amounts}
          title={purchase.title}
          imageUrl={purchase.imageUrl}
        />
      ))}
    </Grid>
  );
};

export default TableBagComponent;
