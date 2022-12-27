import { 
    Box, 
    Button, 
    Typography
} from "@mui/material";
import _ from "lodash";
import { MdFileUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

const UploadFiles = ({ items, setFormData, variable, accept }) => {

    const uploadFile = (event) => {
        
        if (event.target.files !== undefined) {
            setFormData((state) => ({
                ...state, 
                [variable]: items.concat(event.target.files[0].name)
            }))
        } 
    }

    const onDelete = (index) => {
        if (index === 0) {
            items.shift()
        } else {
            items.splice(index, 1)
        }
        setFormData((state) => ({
            ...state,
            [variable]: items
        }))  
    }

    return(
        <Box className="flexColumn" >
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
                    Choose file(s) to upload
                    <input
                        type="file"
                        accept={accept}
                        hidden
                        onChange={uploadFile}
                    />
                </Button>
            </Box>

            { items.length < 1 ? <></> :
                <Box 
                    sx={{
                        pt: 1, 
                        pl: 2, 
                        pr: 8
                    }}
                >
                    {_.map(items, (file, index) => {
                        if (file !== undefined) {
                            const value = file
                            return(
                                <Box    
                                    key={index+value}
                                    className="spaceBetween"
                                >
                                    <Typography
                                        sx={{
                                            fontSize:"14px",
                                            color: "#264653"
                                        }}
                                    >
                                        {index + 1}. {value}
                                    </Typography>
                                    <Button
                                        id={index}
                                        onClick={()=>onDelete(index)}
                                    >   
                                        <RiDeleteBin6Fill 
                                            size={15} 
                                            style={{ 
                                                color: "#264653", 
                                                pointerEvents: "none" 
                                            }}
                                        />  
                                    </Button>
                                </Box>
                            )
                        }
                    })}
                </Box>
            }
        </Box>
    )
}

export default UploadFiles;