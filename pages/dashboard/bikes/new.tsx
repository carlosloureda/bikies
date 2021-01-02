import React from "react";

import AdminDashboard from "../../../components/Layouts/AdminDashboard";
import BikeForm from "../../../components/Bike/BikeForm";

const AddUser = () => {
   
    return (
        <AdminDashboard>
            <h1>Create Bike</h1>
            <BikeForm mode="create"/>      
        </AdminDashboard>
    )
}

export default AddUser;