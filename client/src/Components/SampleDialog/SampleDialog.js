import { useState } from "react";

import { 
    Box,
    Button,
    Dialog,
    DialogContent,
} from "@mui/material";
import { CgClose } from "react-icons/cg";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";


const SampleDialog = ({ open, setOpen, imageList, imageIndex, imagePath }) => {

    const [currImage, setCurrImage] = useState(imageIndex);

    return(
        <Dialog
            open={open}
            fullScreen
            PaperProps={{
                sx:{backgroundColor:"transparent"}
            }}
        >   
            <DialogContent className="center">
                    { currImage !== 0 
                      ? <Button
                            sx={{minWidth:"40px", height:"80%", color:"#FFFFFF", mr: 2}}
                            onClick={() => setCurrImage(currImage - 1 < 0 ? 0 : currImage - 1)}
                        >
                            <BsFillArrowLeftCircleFill 
                                size="20px" 
                                style={{pointerEvents:"none"}} 
                            />                    
                        </Button>
                      : <Box sx={{width:"40px", mr: 2}} />
                    }
                  
                    <img 
                        src={require(`../../Assets/${imagePath}/${imageList[currImage]}.png`)}
                        style={{height:"100%"}}
                    />
                    { currImage !== imageList.length - 1 
                     ?  <Button
                            sx={{minWidth:"40px", height:"80%", color:"#FFFFFF",  ml: 2}}
                            onClick={() => setCurrImage(currImage + 1 > imageList.length-1 
                                                        ? imageList.length - 1 : currImage + 1)}
                        >
                            <BsFillArrowRightCircleFill 
                                size="20px" 
                                style={{pointerEvents:"none"}} 
                            />                    
                        </Button>
                     : <Box sx={{width:"40px", ml: 2}} />
                    }
                   
                    
            </DialogContent>
            <CgClose 
                onClick={()=>setOpen(false)}
                size={20}
                style={{
                    color:"#FFFFFF",
                    position:"absolute",
                    top:"10px",
                    right:"10px",
                    cursor: "pointer",
                }}
            />
            
        </Dialog>
    )
}

export default SampleDialog;