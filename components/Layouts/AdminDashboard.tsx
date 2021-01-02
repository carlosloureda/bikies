import React from "react";
import Navbar from "./Navbar/Navbar"
import DrawerMenu from "./../../components/DrawerMenu/DrawerMenu"

const AdminDashboard = ({children}) => {
    const [openMenu, setOpenMenu] = React.useState(false);

    const onToggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <div>
            <Navbar openDrawerHandler={onToggleMenu}></Navbar>
            <DrawerMenu
                open={openMenu}
                toggleDrawerHandler={onToggleMenu}
            />
            {/* <div> */}
                {children}
            {/* </div> */}
        </div>
    )
}

export default AdminDashboard;