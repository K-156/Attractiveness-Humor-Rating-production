import { Outlet } from "react-router-dom";

import Hamburger from "../Components/NavBar/Hamburger";
import NavBar from "../Components/NavBar/NavBar";
import { useAppContext } from "../Context/AppContext";

const DashboardLayout = () => {

    const {open} = useAppContext();

    return(
        <>
        { !open ? <Hamburger /> : <NavBar/> }   
        <Outlet />
        </>    
    )
}

export default DashboardLayout;