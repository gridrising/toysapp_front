import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import {
  getToysTable,
  addToyTable,
  deleteToyTable,
  updateToyTable,
} from "../redux/action/actions";
import MultiplieSelect from "../components/MultipleSelectComponent";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  statusButton: {
    maxWidth: "100px",
    margin: "2px 0",
    padding: "3px",
  },
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
  useEffect(() => {
    getToysTable();
  }, [addToyTable]);
  useEffect(() => {
    getToysTable();
  }, [deleteToyTable]);
  useEffect(() => {
    getToysTable();
  }, [deleteToyTable]);

  const [state, setState] = React.useState({
    columns: [
      {
        title: "Avatar",
        field: "imageUrl",
        render: (rowData) => (
          <img
            src={rowData.imageUrl}
            alt=''
            style={{ width: 40, borderRadius: "50%" }}
          />
        ),
      },
      {
        title: "Name",
        field: "title",
      },
      {
        title: "Status",
        field: "status",
        editComponent: (props) => (
          <MultiplieSelect editComponentProps={props} />
        ),
        render: (rowData) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {rowData.status.map((OneRowData) => (
              <Button
                className={classes.statusButton}
                variant='contained'
                color='secondary'
                key={Math.random()}
              >
                {OneRowData}
              </Button>
            ))}
          </div>
        ),
      },
      { title: "Description", field: "body" },
      { title: "Price in $", field: "price", type: "numeric" },
      {
        title: "Amounts",
        field: "amounts",
        type: "numeric",
      },
    ],
  });
  return (
    <MaterialTable
      title='Editable Example'
      options={{
        cellStyle: { align: "center" },
        headerStyle: { align: "center" },
      }}
      columns={state.columns}
      data={toysTable}
      editable={{
        onRowAdd: (newData) =>
          new Promise(async (resolve) => {
            resolve();
            await addToyTable(newData);
          }),
        //   new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve();
        //       setState((prevState) => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise(async (resolve) => {
            resolve();
            if (newData !== oldData) await updateToyTable(newData);
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
