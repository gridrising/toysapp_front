import React, { useEffect, useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import { connect, Options } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  TextField,
  Box,
  Avatar,
  Container,
  Modal,
  Fade,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
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
import AvatarModal from './AvatarModal';

const useStyles = makeStyles((theme) => ({
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

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

  const [state] = useState({
    columns: [
      {
        title: 'Avatar',
        field: 'avatar',
        align: 'center',
        editComponent: (imageProps: {
          value: string | FileList;
          onChange: (arg: any) => any;
        }) => {
          console.log(imageProps.value);
          return (
            // <input
            //   type="file"
            //   name="image"
            //   multiple
            //   accept=".jpg, .jpeg, .png"
            //   onChange={(e) => imageProps.onChange(e.target.files)}
            // ></input>
            <Box display="flex" justifyContent="center">
              <AvatarModal
                src={
                  typeof imageProps.value == 'string'
                    ? imageProps.value
                    : 'https://originalnameforbucketforimages.s3.eu-central-1.amazonaws.com/placeholderForAvatar.png'
                }
                change={imageProps.onChange}
              ></AvatarModal>
            </Box>
            // <TextField
            //   label="Images"
            //   value={imageProps.value}
            //   onChange={(e) => imageProps.onChange(e.target.value)}
            // />
          );
        },
        render: (rowData: any) => (
          <Link to={`/toypage/${rowData._id}`}>
            <img
              src={rowData.avatar}
              defaultValue="https://originalnameforbucketforimages.s3.eu-central-1.amazonaws.com/placeholderForAvatar.png"
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
            // const formData = new FormData();
            // if (newData.imageUrl) {
            //   [...newData.imageUrl].forEach((element: File) => {
            //     formData.append('image', element);
            //   });
            // }
            if (!newData.avatar) {
              newData.avatar =
                'https://originalnameforbucketforimages.s3.eu-central-1.amazonaws.com/placeholderForAvatar.png';
            }
            await addToyTable(newData);
            resolve();
          }),
        onRowUpdate: (newData: { [key: string]: any }) =>
          new Promise(async (resolve) => {
            // const formData = new FormData();
            // if (newData.imageUrl) {
            //   [...newData.imageUrl].forEach((element: File) => {
            //     formData.append('image', element);
            //   });
            // }
            await updateToyTable(newData);
            resolve();
          }),
        onRowDelete: (oldData) =>
          new Promise(async (resolve) => {
            await deleteToyTable(oldData._id);
            resolve();
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
