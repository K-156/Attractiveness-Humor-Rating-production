import { 
    Box,
    Chip, 
    TextField 
} from "@mui/material";

const ChatMessageArea = ({ theme }) => {

    return(
        <div >
            <Box>

            </Box>
            <Box className="spaceBetween">
                <TextField
                    disabled
                    label="Write a message..."
                    fullWidth
                    size="small"
                    InputLabelProps={{
                        sx: {fontSize:"14px"}
                    }}
                    sx={{
                        backgroundColor: "#ECECEC", 
                        border: "0px", 
                    }}
                />
                <Chip 
                    sx={{
                        backgroundColor: theme, 
                        color:"#FFFFFF", 
                        px:2, 
                        ml:2
                    }}
                    label="Send"
                />
            </Box>           
        </div>
    )
}

export default ChatMessageArea;