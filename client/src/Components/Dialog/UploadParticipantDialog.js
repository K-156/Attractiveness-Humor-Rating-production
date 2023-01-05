import { 
    Box, 
    Button,
    Dialog, 
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import UploadFiles from "../CustomFormFields/UploadFiles";

const UploadParticipantDialog = ({ open, setOpen, formData, setFormData, handleUpload }) => {
    return(
        <Dialog open={open}>
            <DialogTitle
                className="center"
                sx={{fontWeight: "bold", fontSize:"16px"}}
            >
                Add Participants
            </DialogTitle>
            <DialogContent>
                <Box className="twoColumns" >
                    <Box sx={{width:"200px"}}>
                        <Typography className="variable">Upload participant email</Typography>
                        <Typography className="variable-subtitle">(in .csv)</Typography>
                    </Box>
                    <UploadFiles 
                        items={formData["email"]}
                        setFormData={setFormData}
                        variable="email"
                        accept=".csv"
                        style={{width:"350px"}}
                    />
                </Box>
                <Box className="twoColumns">
                    <Box sx={{width:"200px"}}>
                        <Typography className="variable">Example of the format</Typography>
                        <Typography className="variable-subtitle">(in .csv)</Typography>
                    </Box>
                    <Box className="secondColumn">
                        <img 
                            src={require("../../Assets/emailExample.PNG")}
                            alt="example"
                            style={{width:"230px"}}
                        />  
                    </Box>
                </Box>
                <Box className="spaceBetween" sx={{mt:3}}>
                    <Button
                        variant="outlined"
                        className="customButton-green"
                        sx={{px:2, color: "#264653", borderColor:"#264653", textTransform:"none"}}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        className="customButton-green"
                        sx={{px:3}}
                        // onClick=
                    >
                        Save
                    </Button>

                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default UploadParticipantDialog; 