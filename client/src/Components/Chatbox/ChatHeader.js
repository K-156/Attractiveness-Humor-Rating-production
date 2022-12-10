import { Box, Typography } from "@mui/material";
import { RxMagnifyingGlass } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";

const ChatHeader = ({ receiver }) => {
    return(
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
                 <img 
                    src={require("../../Assets/Candidates/Female 1.jpg")} 
                    alt="display picture"
                    style={{borderRadius: "20px", height: "30px", marginRight:"15px"}}
                />
                <Typography variant="subtitle1" fontWeight="bold" letterSpacing={1}>
                    {receiver.toUpperCase()}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <RxMagnifyingGlass style={{marginRight:3}}/>
                <BiDotsVerticalRounded />
            </Box>
        </Box>
    )
}

export default ChatHeader;