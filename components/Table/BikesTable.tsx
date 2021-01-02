import * as React from 'react';
import { CellParams, DataGrid, GridApi } from '@material-ui/data-grid';
import { useRouter } from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../Dialogs/ConfirmDialog';

let _bikes = [
  { id: 1, model: 'model1', color: 'red', location: 'La Coruña', rating: 4 },
  { id: 2, model: 'model2', color: 'black', location: 'Lugo', rating: 4 },
  { id: 3, model: 'model3', color: 'red', location: 'Madrid', rating: 1 },
  { id: 4, model: 'model4', color: 'blue', location: 'La Coruña', rating: 5 },
  { id: 5, model: 'model5', color: 'yellow', location: 'Orense', rating: 4.2 },
  {
    id: 6,
    model: 'model6',
    color: 'black',
    location: 'Barcelona',
    rating: 3.6,
  },
  { id: 7, model: 'model7', color: 'red', location: 'La Coruña', rating: 2 },
  { id: 8, model: 'model8', color: 'brown', location: 'Valencia', rating: 4.8 },
  {
    id: 9,
    model: 'model9',
    color: 'white',
    location: 'La Coruña',
    rating: 2.9,
  },
];

const getColumns = (actionButtons) => [
  // { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'model',
    headerName: 'Model',
    width: 150,
  },
  { field: 'color', headerName: 'Color', width: 130 },
  { field: 'location', headerName: 'Location', width: 130 },
  { field: 'rating', headerName: 'Rating', width: 50 },
  {
    field: '',
    headerName: 'Actions',
    sortable: false,
    width: 100,
    disableClickEventBubbling: true,
    renderCell: (params: CellParams) => {
      return actionButtons(params);
    },
  },
];

const BikesTable = () => {
  const [rows, setRows] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    setRows(_bikes);
  }, []);

  const actionButtons = (params) => {
    const onDetailHandler = (e) => {
      router.push(`/dashboard/bikes/${params.row.id}`);
    };

    const onDeleteHandler = () => {
      //TODO: delete
      setOpen(true);
      setId(params.row.id);
      //  let _rows  = rows.filter(row =>  row.id !== params.row.id);
      // setRows(_rows);
    };

    return (
      <>
        <IconButton
          edge="start"
          // id="eo"
          // className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={onDetailHandler}
        >
          <SearchIcon color="primary" />
        </IconButton>
        <IconButton
          edge="start"
          // className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={onDeleteHandler}
        >
          <DeleteIcon color="secondary" />
        </IconButton>
      </>
    );
  };

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const onDelete = () => {
    let _rows = rows.filter((row) => row.id !== id);
    setRows(_rows);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <ConfirmDialog
        title="Delete Bike?"
        open={open}
        setOpen={setOpen}
        onConfirm={onDelete}
      >
        Are you sure you want to delete this bike?
      </ConfirmDialog>
      <DataGrid rows={rows} columns={getColumns(actionButtons)} pageSize={5} />
    </div>
  );
};

export default BikesTable;
