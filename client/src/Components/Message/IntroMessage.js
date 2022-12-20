import { Box, Typography } from "@mui/material";

import { IoMdQuote } from "react-icons/io";

const IntroMessage = ({ text }) => {
    return(
    <Box> 
        <Box className="flexStart">
            <IoMdQuote style={{transform: "scale(-1,-1)"}} />
        </Box>
        
        <Typography 
            sx={{
                fontSize:"14px", 
                textAlign:"center",
                p:2
            }}
        >
            {text}
        </Typography>

        <Box className="flexEnd">
            <IoMdQuote />
        </Box>
    </Box>
    )
}

export default IntroMessage; 