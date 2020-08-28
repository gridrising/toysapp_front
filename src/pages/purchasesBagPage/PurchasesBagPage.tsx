import React from 'react';
import TableBagComponent from '../../components/TableBagComponent';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { State, Toy } from '../../types/types';

type Props = {
  purchases: Toy[];
};

const PurchasesBagPage = (props: Props) => {
  const { purchases } = props;
  return (
    <Box>
      <TableBagComponent purchases={purchases}></TableBagComponent>
    </Box>
  );
};

const mapStateToProps = (state: State) => ({
  purchases: state.purchases,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesBagPage);
