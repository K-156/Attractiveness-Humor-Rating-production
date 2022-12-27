import { 
    Alert, 
    AlertTitle, 
    Box, 
    Button, 
    Typography 
} from "@mui/material";
import { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import HomeSample from "./HomeSample";

const UploadPreview = ({ setFormData, formData }) => {

    const [error, setError] = useState(false);
    const [graphic, setGraphic] = useState(null);

    const uploadFile = (event) => {
        if (event.target.files !== undefined) {
            if (formData["graphic"] !== null) {
                setError(true);
                return
            }
        }

        setFormData((state) => ({
            ...state, 
            graphic: event.target.files[0].name
        }))

        setGraphic(URL.createObjectURL(event.target.files[0]))
    }

    const onDelete = () => {
        setError(false);
        setFormData((state) => ({
            ...state, 
            graphic: null
        }))
    };
    

    return(
        <Box className="flexColumn">
            <Box className="secondColumn">
            <Button
                variant="contained"
                className="customButton-green"
                component="label"
                >
                <MdFileUpload size={20} style={{ marginRight: 5 }} />
                Choose a file to upload
                <input type="file" accept=".svg, .png" hidden onChange={uploadFile} />
            </Button>
            </Box >
            { error &&
                <Alert severity="error" sx={{width:"480px"}}>
                    <AlertTitle sx={{ fontWeight: "bold" }}>Upload Failed</AlertTitle>
                    Only <b>ONE</b> image allowed. Delete the current image to add new
                    image.
                </Alert>
            }
            <Box sx={{ pt: 1, pl: 2, pr: 8}} >
                {formData["graphic"]  &&
                    <Box key={formData["graphic"]["name"]} className="spaceBetween">
                        <Typography
                        sx={{
                            fontSize: "14px",
                            color: "#264653",
                        }}
                        >
                        {formData["graphic"]}
                        </Typography>
                        <Button onClick={onDelete}>
                        <RiDeleteBin6Fill
                            size={15}
                            style={{
                            color: "#264653",
                            pointerEvents: "none",
                            }}
                        />
                        </Button>
                    </Box>
                }
            </Box>
        { formData["graphic"] &&
            <Box sx={{width: "480px", height:"300px"}}>
                <HomeSample 
                    theme={formData["theme"]}
                    title={formData["title"]}
                    description={formData["description"]}
                    roleList={formData["roles"]}
                    graphic={graphic}
                />
            </Box>
        }
        
        </Box>
    )
}

export default UploadPreview;