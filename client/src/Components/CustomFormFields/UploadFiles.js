import { useState, useEffect } from "react";

import { Box, Button, Typography} from "@mui/material";
import _ from "lodash";
import { MdFileUpload } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";


const UploadFiles = ({ items, setFormData, variable }) => {

    const uploadFile = (event) => {
        
        if (event.target.files !== undefined) {
            setFormData((state) => ({
                ...state, 
                [variable]: items.concat(event.target.files[0])
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

            { items.length < 1 ? <></> :
                <Box sx={{pt: 1, pl: 2, pr: 8}}>
                    {_.map(items, (file, index) => {
                        if (file !== undefined) {
                            const value = file.name
                            return(
                                <Box    
                                    key={value}
                                    sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{color:"#264653"}}
                                    >
                                        {index + 1}. {value}
                                    </Typography>
                                    <Button
                                        id={index}
                                        onClick={()=>onDelete(index)}
                                    >   
                                        <RiDeleteBin6Fill size={15} style={{color:"#264653", pointerEvents:"none"}}/>  
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