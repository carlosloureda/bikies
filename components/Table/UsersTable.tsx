import * as React from 'react';
import { CellParams, DataGrid, GridApi } from '@material-ui/data-grid';
import { useRouter } from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import Api from '../../utils/api';

const getColumns = (actionButtons) => [
  {
    field: 'email',
    headerName: 'Email',
    // type: 'email',
    width: 250,
  },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
  },
  {
    field: '',
    headerName: 'Actions',
    sortable: false,
    width: 150,
    disableClickEventBubbling: true,
    renderCell: (params: CellParams) => {
      return actionButtons(params);
    },
  },
];

const PAGE_SIZE = 5;

export default function UsersTable() {
  const [users, setUsers] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const router = useRouter();

  async function getUsers({ page = 1, pageSize = 5 }) {
    const result = await Api.get(`api/users?page=${page}&pageSize=${pageSize}`);

    // TODO: errors
    if (result.success) {
      result.data.users = result.data.users.map((d) => {
        d.id = d._id;
        return d;
      });
      setUsers(result.data.users);
      setCount(result.data.count);
    }
  }

  React.useEffect(() => {
    getUsers({ page: 1, pageSize: 5 });
  }, []);

  const actionButtons = (params) => {
    const onDetailHandler = (e) => {
      router.push(`/admin/users/${params.row.id}`);
    };

    const onDeleteHandler = () => {
      setOpen(true);
      setId(params.row.id);
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

  const onDelete = async () => {
    const result = await Api.delete(`api/users/${id}`);
    if (result.success) {
      // let _users = users.filter((user) => user._id !== id);
      // setUsers(_users);
      getUsers({ page: 1, pageSize: PAGE_SIZE });
    }
  };

  const handlePageChange = ({ page, pageSize, ...params }) => {
    getUsers({ page, pageSize });
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
      <DataGrid
        rows={users}
        columns={getColumns(actionButtons)}
        pageSize={PAGE_SIZE}
        paginationMode="server"
        rowCount={count}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
