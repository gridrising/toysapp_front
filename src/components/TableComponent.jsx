import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { TextField, Box } from '@material-ui/core';
import {
  getToysTable,
  addToyTable,
  deleteToyTable,
  updateToyTable,
} from '../redux/action/actions';
import MultiplieSelect from './MultipleSelectTableComponent';
import StatusMarker from './StatusMarker';

const useStyles = makeStyles({
  statusMarker: {
   
    position: 'relative',
    top: '0',
    right: '0',
  },
  description:{
    display: "-webkit-box",
    lineClamp: "3",
    boxOrient: "vertical",
    overflow: "hidden",
  }
});

const MaterialTableDemo = (props) => {
  const classes = useStyles();
  const {
    toysTable,
    getToysTable,
    addToyTable,
    deleteToyTable,
    updateToyTable,
  } = props;
  useEffect(() => {
    if (!toysTable.length) {
      getToysTable();
    }
  }, [getToysTable, toysTable]);

  const [state] = React.useState({
    columns: [
      {
        title: 'Avatar',
        field: 'imageUrl',
        editComponent: (imageProps) => {
         return(
         <TextField
            label="Images"
            multiline
            rowsMax={4}
            value={ typeof imageProps.value === "object" ? imageProps.value.join("\n") : imageProps.value}
            onChange={(e) => imageProps.onChange(e.target.value)}
          />
         )
        },
        render: (rowData) => (
          <Link to={`/toypage/${rowData._id}`}>
            <img
              src={rowData.imageUrl[0]}
              alt=""
              style={{ width: 55, borderRadius: '50%' }}
            />
          </Link>
        ),
      },
      {
        title: 'Name',
        field: 'title',
      },
      {
        title: 'Status',
        field: 'status',
        editComponent: (props) => (
          <MultiplieSelect editComponentProps={props} />
        ),
        render: (rowData) => (
          <StatusMarker card={false} status={rowData.status} />
          
        ),
      },
      { title: 'Description', field: 'body',
      render:(rowData) => (<Box className={classes.description}>{rowData.body}</Box>), },
      { title: 'Price in $', field: 'price', type: 'numeric' },
      {
        title: 'Amounts',
        field: 'amounts',
        type: 'numeric',
      },
    ],
  });
  return (
    <MaterialTable
      title="Editable Example"
      options={{
        actionsColumnIndex: -1,
        cellStyle: { align: 'center' },
        headerStyle: { align: 'center' },
      }}
      columns={state.columns}
      data={toysTable}
      editable={{
        onRowAdd: (newData) => new Promise(async (resolve) => {
          resolve();
          const newDataWithImageUrls = typeof newData.imageUrl !== "object" ? {...newData,imageUrl:newData.imageUrl?.split('\n')} : newData;
          await addToyTable(newDataWithImageUrls)
        }),
        onRowUpdate: (newData) => new Promise(async (resolve) => {
          resolve();
          const newDataWithImageUrls = typeof newData.imageUrl !== "object" ? {...newData,imageUrl:newData.imageUrl?.split('\n')} : newData;
          await updateToyTable(newDataWithImageUrls);
        }),
        onRowDelete: (oldData) => new Promise(async (resolve) => {
          resolve();
          await deleteToyTable(oldData._id);
        }),
      }}
    />
  );
};
const mapStateToProps = (state) => ({
  toysTable: state.toys,
});
const mapDispatchToProps = {
  getToysTable,
  addToyTable,
  deleteToyTable,
  updateToyTable,
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);
