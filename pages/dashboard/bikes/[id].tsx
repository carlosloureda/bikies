import { useRouter } from 'next/router'
import React from "react"
import {
    Button,
} from '@material-ui/core';
import ConfirmDialog from '../../../components/Dialogs/ConfirmDialog';
import BikeForm from '../../../components/Bike/BikeForm';

const bikes = [
    { id: 1, model: "model1", color: 'red', location: 'La Coruña', rating: 4 },
    { id: 2, model: "model2", color: 'black', location: 'Lugo', rating: 4 },
    { id: 3, model: "model3", color: 'red', location: 'Madrid', rating: 1 },
    { id: 4, model: "model4", color: 'blue', location: 'La Coruña', rating: 5 },
    { id: 5, model: "model5", color: 'yellow', location: 'Orense', rating: 4.2 },
    { id: 6, model: "model6", color: 'black', location: 'Barcelona', rating: 3.6 },
    { id: 7, model: "model7", color: 'red', location: 'La Coruña', rating: 2 },
    { id: 8, model: "model8", color: 'brown', location: 'Valencia', rating: 4.8 },
    { id: 9, model: "model9", color: 'white', location: 'La Coruña', rating: 2.9 },
  ];

const UserDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const [currentBike, setCurrentBike] = React.useState(null)

    const [mode, setMode] = React.useState("view");
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    
    React.useEffect(() => {
        const bike = bikes.find(bike =>  bike.id === parseInt(id as string))
        if(bike) setCurrentBike(bike)
        else setCurrentBike(null)
    }, [])

    const onDelete = () => {
        console.log("Delete bike and redirect to nikes");
        router.push("/dashboard/bikes")
    }

    return (
        <>
            <h1>Bike Detail: {id}</h1>
            
            {mode === 'view' && (
                <>
                    <Button variant="contained" color="primary" onClick={() => setMode('edit')}>
                        Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => setOpenDeleteModal(true)}>
                        Delete
                    </Button>
                </>    
            )}
            {mode === 'edit' && (
                <Button variant="contained" color="primary" onClick={() => setMode('view')}>
                    Cancel
                </Button>    
            )}
            <BikeForm mode={mode} />
            {/* TODO: show user bookings */}

            <ConfirmDialog
                title="Delete Bike?"
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                onConfirm={onDelete}
            >
                Are you sure you want to delete this bike?
            </ConfirmDialog>
        </>    
    )
}

export default UserDetail;