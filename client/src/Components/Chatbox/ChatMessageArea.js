import { Box, Chip, TextField } from "@mui/material";

const ChatMessageArea = () => {
    return(
        <div >
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <TextField
                    disabled
                    label="Write a message..."
                    fullWidth
                    size="small"
                    sx={{backgroundColor: "#ECECEC", border: "0px", textTransform: false}}
                />
                <Chip 
                    sx={{backgroundColor: "#264653", color:"#FFFFFF", px:2, ml:2}}
                    label="Send"
                />
            </Box>           
        </div>
    )
}

export default ChatMessageArea;