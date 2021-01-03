import * as React from 'react';
import { CellParams, DataGrid, GridApi } from '@material-ui/data-grid';
import { useRouter } from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import Api from '../../utils/api';
import { Chip } from '@material-ui/core';

const getColumns = (actionButtons) => [
  {
    field: 'model',
    headerName: 'Model',
    width: 250,
  },
  { field: 'color', headerName: 'Color', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'rating', headerName: 'Rating', width: 100 },
  {
    field: 'available',
    headerName: 'Available',
    renderCell: (params: CellParams) => {
      let { state, available } = params.row;
      enum Color {
        primary = 'primary',
        secondary = 'secondary',
      }
      let color: Color = available ? Color['primary'] : Color['secondary'];

      return <Chip label={available ? 'Yes' : 'No'} color={color} />;
    },

    width: 125,
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

const BikesTable = () => {
  const [bikes, setBikes] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const router = useRouter();

  async function getBikes({ page = 1, pageSize = 5 }) {
    const result = await Api.get(`api/bikes?page=${page}&pageSize=${pageSize}`);

    if (result.success) {
      result.data.bikes = result.data.bikes.map((d) => {
        d.id = d._id;
        return d;
      });
      setBikes(result.data.bikes);
      setCount(result.data.count);
    }
  }

  React.useEffect(() => {
    getBikes({ page: 1, pageSize: 5 });
  }, []);

  const actionButtons = (params) => {
    const onDetailHandler = (e) => {
      router.push(`/admin/bikes/${params.row.id}`);
    };

    const onDeleteHandler = () => {
      setOpen(true);
      setId(params.row.id);
    };

    return (
      <>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onDetailHandler}
        >
          <SearchIcon color="primary" />
        </IconButton>
        <IconButton
          edge="start"
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
    const result = await Api.delete(`api/bikes/${id}`);
    if (result.success) {
      getBikes({ page: 1, pageSize: PAGE_SIZE });
    }
  };

  const handlePageChange = ({ page, pageSize, ...params }) => {
    getBikes({ page, pageSize });
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

      <DataGrid
        rows={bikes}
        columns={getColumns(actionButtons)}
        pageSize={PAGE_SIZE}
        paginationMode="server"
        rowCount={count}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BikesTable;
