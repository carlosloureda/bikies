import * as React from 'react';
import { CellParams, DataGrid, GridApi } from '@material-ui/data-grid';
import { useRouter } from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../Dialogs/ConfirmDialog';

let _rows = [
  {
    id: 1,
    email: 'email1@mail.com',
    lastName: 'Snow',
    name: 'Jon',
    role: 'manager',
  },
  {
    id: 2,
    email: 'email2@mail.com',
    lastName: 'Lannister',
    name: 'Cersei',
    role: 'user',
  },
  {
    id: 3,
    email: 'email3@mail.com',
    lastName: 'Lannister',
    name: 'Jaime',
    role: 'user',
  },
  {
    id: 4,
    email: 'email4@mail.com',
    lastName: 'Stark',
    name: 'Arya',
    role: 'user',
  },
  {
    id: 5,
    email: 'email5@mail.com',
    lastName: 'Targaryen',
    name: 'Daenerys',
    role: 'user',
  },
  {
    id: 6,
    email: 'email6@mail.com',
    lastName: 'Melisandre',
    name: null,
    role: 'user',
  },
  {
    id: 7,
    email: 'email7@mail.com',
    lastName: 'Clifford',
    name: 'Ferrara',
    role: 'user',
  },
  {
    id: 8,
    email: 'email8@mail.com',
    lastName: 'Frances',
    name: 'Rossini',
    role: 'user',
  },
  {
    id: 9,
    email: 'email9@mail.com',
    lastName: 'Roxie',
    name: 'Harvey',
    role: 'user',
  },
];

const getColumns = (actionButtons) => [
  // { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'email',
    headerName: 'Email',
    // type: 'email',
    width: 250,
  },
  { field: 'name', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'role',
    headerName: 'Role',
    width: 90,
  },
  {
    field: 'create',
    headerName: 'Create',
    type: 'button',
    width: 90,
  },
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
export default function UserTable() {
  const [rows, setRows] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    setRows(_rows);
  }, []);

  const actionButtons = (params) => {
    const onDetailHandler = (e) => {
      router.push(`/dashboard/users/${params.row.id}`);
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
        title="Delete User?"
        open={open}
        setOpen={setOpen}
        onConfirm={onDelete}
      >
        Are you sure you want to delete this user?
      </ConfirmDialog>
      <DataGrid rows={rows} columns={getColumns(actionButtons)} pageSize={5} />
    </div>
  );
}
