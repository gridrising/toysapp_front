import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { getToysTable, addToyTable } from "../redux/action/actions";

const MaterialTableDemo = (props) => {
  const { toysTable, getToysTable, addToyTable } = props;
  useEffect(() => {
    if (!toysTable.length) {
      getToysTable();
    }
  }, [getToysTable, toysTable]);
  useEffect(() => {
    getToysTable();
  }, [addToyTable]);

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
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
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
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);
