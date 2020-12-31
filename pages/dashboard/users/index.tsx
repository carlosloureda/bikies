import React from "react";
import { Button } from "@material-ui/core";
import { useRouter } from 'next/router';

import AdminDashboard from "../../../components/Layouts/AdminDashboard";
import UserTable from "../../../components/Table/UserTable";

const Dashboard = () => {
    const [openMenu, setOpenMenu] = React.useState(false);

    const router = useRouter();

    return (
        <AdminDashboard>
            <h1>Users</h1>
            <div>
                <Button color="primary" onClick={() => router.push('/dashboard/users/new')}>
                    New User
                </Button>
            </div>
            {/* TODO: show users, filter, edit, delete ? */}
            {/* TODO: show user detail */}
            {/* TODO: create user button */}
            <UserTable />

        </AdminDashboard>
    )
}

export default Dashboard;