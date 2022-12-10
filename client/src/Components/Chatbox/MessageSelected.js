import { Box, Button, Typography } from "@mui/material";
import _ from "lodash";
import { BsPersonCircle } from "react-icons/bs";


const MessageSelected = ({ selectMessage }) => {

    return(
        <Box height="120px" display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Box display="flex" alignItems="flex-end" maxWidth="70%">  
                <Typography 
                    variant="subtitle2" 
                    sx={{backgroundColor: "#264653", color: "#FFFFFF", p:1.5, borderRadius: "10px"}}
                >
                    {selectMessage}
                </Typography>
                <BsPersonCircle size="30px" style={{color: "#264653", marginLeft: 10}}/>
            </Box>
            
        </Box>     
    )
}

export default MessageSelected;