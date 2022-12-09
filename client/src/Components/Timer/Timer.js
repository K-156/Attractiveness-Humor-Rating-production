
import { Typography } from "@mui/material";
import { FiClock } from "react-icons/fi";


const Timer = () => {

    const timer = "45:00"

    return(
        <>
            <Typography 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                color="#C59D5F"
                mb={1}
            >
                <FiClock style={{marginRight:"15px"}}/>{timer}
            </Typography>            
        </>
        
    )
}

export default Timer;