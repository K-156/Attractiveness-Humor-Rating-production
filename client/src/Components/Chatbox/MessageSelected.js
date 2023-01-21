import { Box, Button, Typography } from "@mui/material";
import _ from "lodash";
import { BsPersonCircle } from "react-icons/bs";


const MessageSelected = ({ selectMessage, theme }) => {

    return(
        <Box 
            sx={{
                height:"120px",
                display:"flex",
                justifyContent:"flex-end",
                alignItems:"flex-end",
                my:"12rem"
            }}
        >
            <Box 
                sx={{
                    display:"flex",
                    alignItems:"flex-end",
                    maxWidth:"70%"
                }}
            >  
                <Typography 
                    sx={{
                        backgroundColor: theme, 
                        color: "#FFFFFF", 
                        fontSize: "14px",
                        p:1.5, 
                        borderRadius: "10px"
                    }}
                >
                    {Object.values(selectMessage)}
                </Typography>
                <BsPersonCircle 
                    size="30px" 
                    style={{
                        color: theme,
                        marginLeft: 10
                    }}
                />
            </Box>
            
        </Box>     
    )
}

export default MessageSelected;