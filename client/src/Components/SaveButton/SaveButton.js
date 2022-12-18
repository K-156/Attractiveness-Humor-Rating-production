import { Box, Button } from "@mui/material";

const SaveButton = ({projectType, formData}) => {
    
    return(
        <Box sx={{my:2, display:"flex", justifyContent:"flex-end"}}>
            <Button
                variant="contained"
                sx={{background: "#264653",
                    "&:hover": { backgroundColor: "#C59D5F" },
                    textTransform: "none"}}
                onClick={()=>{localStorage.setItem(projectType,JSON.stringify(formData))}}
            >
                Save Changes
            </Button>
        </Box>
    )
}

export default SaveButton;