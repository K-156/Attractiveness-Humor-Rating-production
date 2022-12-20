import { 
    Box,
    Chip, 
    TextField 
} from "@mui/material";

const ChatMessageArea = ({ theme }) => {

    return(
        <div >
            <Box className="spaceBetween">
                <TextField
                    disabled
                    label="Write a message..."
                    fullWidth
                    size="small"
                    sx={{
                        backgroundColor: "#ECECEC", 
                        border: "0px", 
                        textTransform: false
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