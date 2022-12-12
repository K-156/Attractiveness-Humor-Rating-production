import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "@mui/material";

import "./NavBar.css";
import { useAppContext } from "../../Context/AppContext";

const Hamburger = () => {

    const { open, setOpen} = useAppContext();
    console.log(open)

    return(
    <div style={{display:"block", width:"100%", height:"30px"}}>
    <Button 
        id="hamburger"
        sx={{color: open ? "#FFFFFF" : "#264653"}}
        disableRipple
        onClick={() => setOpen()}
    >
        <RxHamburgerMenu size={30}/>
    </Button>
    </div>
   
    )
}

export default Hamburger;