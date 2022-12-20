import { useState } from "react";

import { 
    Alert, 
    AlertTitle, 
    Box, 
    Button, 
    Typography
} from "@mui/material";
import { MdFileUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { colorPalette } from "../../Utils/colorPalette";

const UploadOneFile = ({ id, setFormData, formData, accept }) => {

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
        <Box className="flexColumn">
            <Box className="secondColumn">
                <Button 
                    variant="contained" 
                    className="customButton-green"
                    component="label"
                >
                    <MdFileUpload 
                        size={20} 
                        style={{marginRight:5}}
                    />
                    Choose a file to upload
                    <input
                        type="file"
                        accept={accept}
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
            <Box 
                sx={{
                    pt: 1, 
                    pl: 2, 
                    pr: 8
                }}
            >
                { formData[id]["img"] === null ? <></> :
                    <Box    
                        key={formData[id]["img"]["name"]}
                        className="spaceBetween"
                    >
                        <Typography
                            sx={{
                                fontSize:"14px",
                                color: colorPalette["green"]["primary"]
                            }}
                        >
                            {formData[id]["img"]["name"]}
                        </Typography>
                        <Button onClick={onDelete} >   
                            <RiDeleteBin6Fill 
                                size={15} 
                                style={{ 
                                    color: colorPalette["green"]["primary"], 
                                    pointerEvents: "none" 
                                }}
                            />  
                        </Button>
                    </Box> 
                }
            </Box>
        </Box>
    )
}

export default UploadOneFile;