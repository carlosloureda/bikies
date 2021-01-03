import * as React from 'react';
import {
  CellParams,
  DataGrid,
  ValueGetterParams,
} from '@material-ui/data-grid';

import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import { Box, Chip, Grid, Link } from '@material-ui/core';
import Api from '../../utils/api';

const PAGE_SIZE = 5;

const diffDays = (date2: Date, date1: Date) => {
  const diff = date2.getTime() - date1.getTime();
  return diff / (1000 * 3600 * 24);
};

const getColumns = (actionButtons) => [
  {
    field: 'model',
    // label: `${bike.model}`,
    headerName: 'Bike',
    width: 200,
    renderCell: (params: CellParams) => {
      return (
        <Link href={`/admin/bikes/${params.row.bike._id}`}>
          {params.row.bike.model}
        </Link>
      );
    },
  },
  {
    field: 'user.email',
    headerName: 'User',
    renderCell: (params: CellParams) => {
      return (
        <Link href={`/admin/users/${params.row.user._id}`}>
          {params.row.user.email}
        </Link>
      );
    },
    width: 250,
  },
  {
    field: 'days',
    headerName: 'Days',
    valueGetter: (params: ValueGetterParams) => {
      const date2 = new Date(params.row.endDate);
      const date1 = new Date(params.row.startDate);
      return diffDays(date2, date1);
    },
    width: 100,
  },
  {
    field: 'startDate',
    headerName: 'Start date',
    valueGetter: (params: ValueGetterParams) =>
      new Date(params.row.startDate).toLocaleString(),
    width: 200,
  },
  {
    field: 'endDate',
    headerName: 'End date',
    valueGetter: (params: ValueGetterParams) =>
      new Date(params.row.endDate).toLocaleString(),
    width: 200,
  },
  { field: 'rating', headerName: 'Rating', width: 130 },
  {
    field: 'state',
    headerName: 'State',
    renderCell: (params: CellParams) => {
      let { state } = params.row;
      enum Color {
        primary = 'primary',
        secondary = 'secondary',
        default = 'default',
      }
      let color: Color = Color['default'];
      if (state === 'active') color = Color['primary'];
      else if (state === 'cancelled') color = Color['secondary'];

      return <Chip label={params.row.state} color={color} />;
    },
    width: 130,
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

// bike Id
// startDate y endDate
// rating for that booking

const UserBookings = ({ user }) => {
  const [bookings, setBookings] = React.useState([]);
  const [booking, setBooking] = React.useState(null);
  const [count, setCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  async function getBookings({ page = 1, pageSize = 5 }) {
    const result = await Api.get(
      `api/bookings?page=${page}&pageSize=${pageSize}&user=${user._id}`
    );

    if (result.success) {
      result.data.bookings = result.data.bookings.map((d) => {
        d.id = d._id;
        return d;
      });
      setBookings(result.data.bookings);
      setCount(result.data.count);
    }
  }

  React.useEffect(() => {
    setBookings(bookings);
  }, []);

  const handlePageChange = ({ page, pageSize, ...params }) => {
    getBookings({ page, pageSize });
  };

  const actionButtons = (params) => {
    const onCancelHandler = () => {
      setOpen(true);
      setBooking(params.row);
    };

    if (params.row.state === 'active') {
      return (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="cancel booking"
          onClick={onCancelHandler}
        >
          <BlockIcon color="secondary" />
        </IconButton>
      );
    }
    return null;
  };

  return (
    <DataGrid
      rows={bookings}
      columns={getColumns(actionButtons)}
      pageSize={PAGE_SIZE}
      paginationMode="server"
      rowCount={count}
      onPageChange={handlePageChange}
    />
  );
};

export default UserBookings;
