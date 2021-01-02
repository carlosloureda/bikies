import React from "react";

import AdminDashboard from "../../../components/Layouts/AdminDashboard";
import UserForm from "../../../components/User/UserForm";

const AddUser = () => {
   
    return (
        <AdminDashboard>
            <h1>Create User</h1>
            <UserForm mode="create"/>      
        </AdminDashboard>
    )
}

export default AddUser;