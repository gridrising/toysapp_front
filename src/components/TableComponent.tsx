import React, { useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import { connect, Options } from 'react-redux';
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
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Toy, State } from '../types/types';

const useStyles = makeStyles({
  statusMarker: {
    position: 'relative',
    top: '0',
    right: '0',
  },
  description: {
    display: '-webkit-box',
    lineClamp: 3,
    boxOrient: 'vertical',
    overflow: 'hidden',
  },
});

type Props = {
  toysTable: Toy[];
  getToysTable: () => Promise<void>;
  addToyTable: (obj: { [key: string]: any }) => Promise<void>;
  deleteToyTable: (id: string) => Promise<void>;
  updateToyTable: (obj: { [key: string]: any }) => Promise<void>;
};

const MaterialTableDemo = (props: Props) => {
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
        align: 'center',
        editComponent: (imageProps: any) => {
          console.log(imageProps);
          return (
            <input
              type="file"
              name="image"
              multiple
              accept=".jpg, .jpeg, .png"
              onChange={(e) => imageProps.onChange(e.target.files)}
            ></input>
            // <TextField
            //   label="Images"
            //   multiline
            //   rowsMax={4}
            //   value={
            //     typeof imageProps.value === 'object'
            //       ? imageProps.value.join('\n')
            //       : imageProps.value
            //   }
            //   onChange={(e) => imageProps.onChange(e.target.value)}
            // />
          );
        },
        render: (rowData: any) => (
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
        editComponent: (props: any) => (
          <MultiplieSelect editComponentProps={props} />
        ),
        render: (rowData: any) => (
          <StatusMarker card={false} status={rowData.status} />
        ),
      },
      {
        title: 'Description',
        field: 'body',
        render: (rowData: any) => (
          <Box className={classes.description}>{rowData.body}</Box>
        ),
      },
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
      options={
        {
          actionsColumnIndex: -1,
          cellStyle: { align: 'center' } as CSSProperties,
          headerStyle: { align: 'center' } as CSSProperties,
        } as {
          actionsColumnIndex: number;
          cellStyle: CSSProperties;
          headerStyle: CSSProperties;
        }
      }
      columns={state.columns as Column<Toy>[]}
      data={toysTable}
      editable={{
        onRowAdd: (newData: { [key: string]: any }) =>
          new Promise(async (resolve) => {
            resolve();
            const formData = new FormData();
            if (newData.imageUrl) {
              [...newData.imageUrl].forEach((element: File) => {
                formData.append('image', element);
              });
            }
            await addToyTable({ ...newData, imageUrl: formData });
          }),
        onRowUpdate: (newData: { [key: string]: any }) =>
          new Promise(async (resolve) => {
            resolve();
            const newDataWithImageUrls =
              typeof newData.imageUrl !== 'object'
                ? { ...newData, imageUrl: newData.imageUrl?.split('\n') }
                : newData;
            await updateToyTable(newDataWithImageUrls);
          }),
        onRowDelete: (oldData) =>
          new Promise(async (resolve) => {
            resolve();
            await deleteToyTable(oldData._id);
          }),
      }}
    />
  );
};
const mapStateToProps = (state: State) => ({
  toysTable: state.toys,
});
const mapDispatchToProps = {
  getToysTable,
  addToyTable,
  deleteToyTable,
  updateToyTable,
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);
