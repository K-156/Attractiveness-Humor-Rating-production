import { Box, Typography } from "@mui/material";

import { IoMdQuote } from "react-icons/io";

const IntroMessage = ({ text }) => {
    return(
    <Box> 
        <Box display="flex" justifyContent="flex-start">
            <IoMdQuote style={{transform: "scale(-1,-1)"}} />
        </Box>
        
        <Typography variant="subtitle2" textAlign="center" p={2}>
            {text}
        </Typography>

        <Box display="flex" justifyContent="flex-end">
            <IoMdQuote />
        </Box>


    </Box>
    )
}

export default IntroMessage; 