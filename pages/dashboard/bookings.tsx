import React from "react";

import AdminDashboard from "../../components/Layouts/AdminDashboard"

const Dashboard = () => {
    const [openMenu, setOpenMenu] = React.useState(false);

    const onToggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <AdminDashboard>
            <h1>Bookings</h1>
        </AdminDashboard>
    )
}

export default Dashboard;