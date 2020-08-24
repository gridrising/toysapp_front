import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({

  statusButton: {
    maxWidth: '50px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px 0',
    position: 'absolute',
    zIndex: '1000',
    top: '10px',
    right: '0px',
    borderRadius: '0',
    color: '#fff',
    padding: '4px 10px',
    backgroundColor: '#f50057',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
    fontWeight: '500',
    lineHeight: '1.75',
    textAlign: 'center',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
  },
  statusMarker: {
    maxWidth: '50px',
    margin: '5px 0',
    borderRadius: '0',
    color: '#fff',
    padding: '2px 4px',
    backgroundColor: '#f50057',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
    fontWeight: '450',
    fontSize: '14px',
    lineHeight: '1.30',
    textAlign: 'center',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
  },
});
const StatusMarker = (props) => {
  const { status, card } = props;
  const classes = useStyles();
  return (
    <div className={card ? classes.statusButton : classes.statusMarker}>
      {status}
    </div>
  );
};

export default StatusMarker;
