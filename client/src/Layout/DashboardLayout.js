import { useContext } from "react";
import { Outlet } from "react-router-dom";

import Hamburger from "../Components/NavBar/Hamburger";
import NavBar from "../Components/NavBar/NavBar";
import { AppContext } from "../Context/AppContext";

const DashboardLayout = () => {

    const {open, setOpen} = useContext(AppContext);

    return(
        <>
        { !open ? <Hamburger open={open} setOpen={setOpen} /> : <NavBar/> }   
        <Outlet />
        </>    
    )
}

export default DashboardLayout;