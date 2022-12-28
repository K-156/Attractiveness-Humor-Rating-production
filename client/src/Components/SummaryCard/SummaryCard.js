import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
    Box, 
    Button,
    Card, 
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import { GrClose } from "react-icons/gr";

import OptionsContent from "./OptionsContent";
import GeneralContent from "./GeneralContent";

const SummaryCard = ({ header, content, editLink, template }) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [expandedText, setExpandedText] = useState({});

    const handleOnClick = (event, value) => {
        setOpen(true)
        setExpandedText({
            title: event.target.id, 
            content: value
        })        
    }
    const handleOnEdit = () => {
        navigate(editLink, {
            state: {
                template: template
            }
        })
    }

    return(
        <>
        <Card sx={{my: 1}}>
            <CardContent>
                <Box 
                    className="spaceBetween"
                    sx={{ mx: "10px" }}
                >
                    <Typography className="summaryHeader">
                        {header}
                    </Typography>
                    <Button
                        sx={{minWidth:"10px"}}
                        onClick={handleOnEdit}
                    >
                        <MdModeEdit 
                            style={{
                                color:"#264653", 
                                pointerEvents:"none"
                            }} 
                        />
                    </Button>
                </Box>
                { header.toLowerCase().includes("template 1") || header.toLowerCase().includes("template 3")
                    ? <OptionsContent 
                        content={content}
                        handleOnClick={handleOnClick}
                        header={header}
                       />
                    : <GeneralContent 
                        content={content}
                        handleOnClick={handleOnClick}
                       />
                }

            </CardContent>
        </Card>
        <Dialog
                open={open}
                fullWidth
            >
            <DialogTitle>
                <Box className="spaceBetween">
                    <Typography
                        variant="h6"
                        sx={{
                            color:"#264653", 
                            fontWeight:"bold",
                            width:"200px"
                        }}
                    >
                        {expandedText["title"]}
                    </Typography>
                    <Button
                            onClick={()=>setOpen(false)}
                            sx={{minWidth:"10px"}}
                    >
                        <GrClose style={{pointerEvents:"none"}}/>

                    </Button>
                </Box>
            </DialogTitle>
            <DialogContent>                   
                <Typography sx={{fontSize:"14px"}}>
                    {expandedText["content"]}
                </Typography>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default SummaryCard;