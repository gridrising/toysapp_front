import React from 'react';
import Badge from '@material-ui/core/Badge';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from 'react-redux';
import { State, Toy } from '../types/types';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  })
)(Badge);

type Props = {
  purchases: Toy[];
};

const ShoppingBadge = (props: Props) => {
  const { purchases } = props;
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={purchases.length} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};

const mapStateToProps = (state: State) => ({
  purchases: state.purchases,
});

export default connect(mapStateToProps)(ShoppingBadge);
