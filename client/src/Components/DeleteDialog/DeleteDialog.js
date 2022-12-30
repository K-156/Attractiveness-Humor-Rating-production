import { 
    Alert,
    AlertTitle,
    Box, 
    Button,
    Dialog, 
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";

const DeleteDialog = ({ open, setOpen, isActive, handleDelete, id }) => {
    return(
        <Dialog open={open}>
            { isActive ?
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <Box sx={{pr:"20px"}}>Active project cannot be deleted</Box>
                <Button
                    sx={{
                        textTransform:"none", 
                        color: "#ef5350", 
                        mt: 1
                    }}
                    onClick={()=>setOpen(false)}
                >
                    <HiArrowLeft  style={{marginRight:"10px"}} />Return
                </Button>
            </Alert>
            :
            <>
            <DialogTitle 
                className="center"
                sx={{fontWeight:"bold", fontSize:"16px", color:"#264653"}}
            >
                Delete Project?
            </DialogTitle>
            <DialogContent
                sx={{width: "350px"}}
            >
                <Typography sx={{textAlign:"center"}}>
                    This project and the files will be permanently deleted from the storage
                </Typography>
                <Box 
                    className="spaceBetween"
                    sx={{pt: 2, px: 2}}
                >
                    <Button
                        variant="outlined"
                        sx={{color: "#264653", borderColor:"#264653", textTransform:"none"}}
                        onClick={()=> setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        className="customButton-green"
                        onClick={handleDelete}
                        value={true}
                        name={id}
                    >
                        Delete
                    </Button>
                </Box>
            </DialogContent>            
            </>
            }
            
        </Dialog>
    )
}

export default DeleteDialog; 