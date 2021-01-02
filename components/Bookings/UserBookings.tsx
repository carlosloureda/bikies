import * as React from 'react';
import { CellParams, DataGrid } from '@material-ui/data-grid';

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';


const bookings = [
    { id: 1, model: "model1", startDate: 'red', endDate: 'La Coruña', rating: 4, bikeId: 1 },
    { id: 2, model: "model2", startDate: 'black', endDate: 'Lugo', rating: 4, bikeId: 2 },
    { id: 3, model: "model3", startDate: 'red', endDate: 'Madrid', rating: 1, bikeId: 3 },
    { id: 4, model: "model4", startDate: 'blue', endDate: 'La Coruña', rating: 5, bikeId: 4 },
    { id: 5, model: "model5", startDate: 'yellow', endDate: 'Orense', rating: 4.2, bikeId: 5 },
    { id: 6, model: "model6", startDate: 'black', endDate: 'Barcelona', rating: 3.6, bikeId: 6 },
    { id: 7, model: "model7", startDate: 'red', endDate: 'La Coruña', rating: 2, bikeId: 7 },
    { id: 8, model: "model8", startDate: 'brown', endDate: 'Valencia', rating: 4.8, bikeId: 8 },
    { id: 9, model: "model9", startDate: 'white', endDate: 'La Coruña', rating: 2.9, bikeId: 9 },
];

const getColumns = (actionButtons) => [
    // { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'model',
      headerName: 'Model',
      width: 150,
    },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'endDate', headerName: 'End Date', width: 130 },
    { field: 'rating', headerName: 'Rating', width: 130 },
    // TODO: the url to go to bike detail ?
    // {
    //   field: "",
    //   headerName: "Actions",
    //   sortable: false,
    //   width: 100,
    //   disableClickEventBubbling: true,
    //   renderCell: (params: CellParams) => {
    //     return actionButtons(params);
    //   }
    // },
  ];

// bike Id
// startDate y endDate
// rating for that booking

const UserBookings = () => {
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        setRows(bookings)
    }, [])

    // const actionButtons = (params) => {
    //     const onDetailHandler = (e) => {
    //       router.push(`/dashboard/bikes/${params.row.id}`)
    //     }
    
    //     const onDeleteHandler = () => {
    //        //TODO: delete
    //       setOpen(true)
    //       setId(params.row.id)
    //       //  let _rows  = rows.filter(row =>  row.id !== params.row.id);
    //       // setRows(_rows);
    
    //     }
    
    //     return (
    //       <>
    //         <IconButton
    //             edge="start"
    //             color="inherit"
    //             aria-label="open drawer"
    //             onClick={onDetailHandler}
    //         >
    //             <SearchIcon color="primary"/>
    //         </IconButton>
    //         <IconButton
    //             edge="start"
    //             color="inherit"
    //             aria-label="open drawer"
    //             onClick={onDeleteHandler}
    //         >
    //             <DeleteIcon color="secondary"/>
    //         </IconButton>
    //       </>  
    //     );
        
    //   }

    return (
        // <DataGrid rows={rows} columns={getColumns(actionButtons)} pageSize={5} />
        <DataGrid rows={rows} columns={getColumns(null)} pageSize={5} />
    )
}

export default UserBookings

