import { useState } from "react";

import { Alert, AlertTitle, Box, Button, Typography} from "@mui/material";
import _ from "lodash";
import { MdFileUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";


const UploadOneFile = ({ id, setFormData, formData }) => {

    const [error, setError] = useState(false)
    const uploadFile = (event) => {
        
        if (event.target.files !== undefined) {

            if (formData[id]["img"] !== null) {
                setError(true);
                return;
            } 

            setFormData((state)=>({
                ...state, 
                [id]: {
                    ...formData[id],
                    img: event.target.files[0]
                }
            }))
        } 
    }

    const onDelete = () => {
        setError(false)
        setFormData((state)=>({
            ...state, 
            [id]: {
                ...formData[id],
                img: null
            }
        }))
    }

    return(
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <Box className="secondColumn">
                <Button 
                    variant="contained" 
                    sx={{background: "#264653",
                        "&:hover": { backgroundColor: "#C59D5F" },
                        textTransform: "none"}}
                    component="label"
                >
                    <MdFileUpload size={20} style={{marginRight:5}}/>
                    Choose a file to upload
                    <input
                        type="file"
                        accept=".csv"
                        hidden
                        onChange={uploadFile}
                    />
                </Button>
            </Box>
            {!error ? <></> :
                <Alert severity="error">
                    <AlertTitle sx={{fontWeight:"bold"}}>Upload Failed</AlertTitle>
                    Only <b>ONE</b> image allowed. Delete the current image to add new image.
                </Alert>
            }
            <Box sx={{pt: 1, pl: 2, pr: 8}}>
                { formData[id]["img"] === null ? <></> :
                    <Box    
                        key={formData[id]["img"]["name"]}
                        sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{color:"#264653"}}
                        >
                            {formData[id]["img"]["name"]}
                        </Typography>
                        <Button
                            onClick={onDelete}
                        >   
                            <RiDeleteBin6Fill size={15} style={{color:"#264653", pointerEvents:"none"}}/>  
                        </Button>
                    </Box> 
                }
            </Box>
        </Box>
    )
}

export default UploadOneFile;