import { useState } from "react";

import { 
    Box,
    Button,
    Card, 
    CardActionArea, 
    CardContent, 
    CardHeader,
    Dialog,
    DialogContent
} from "@mui/material";
import _ from "lodash";
import { GrClose } from "react-icons/gr";

import { templates, templatePurpose, templateSamples} from "../../Utils/TemplateList";
import "./TemplateCard.css";

const TemplateCard = ({ template }) => {

    const [open, setOpen] = useState(false);
    const [expandImage, setExpandImage] = useState("");

    const handleOnClick = (event) => {
        const imageName = event.target.alt;
        if (imageName) {
            setExpandImage(imageName);
        }

        setOpen(true)

    }
    
    return(
        <Card
            sx={{my: 2}}
        >
            <CardHeader
                title={templates[template]}
                subheader={templatePurpose[template]}
                sx={{pb:0}}
                titleTypographyProps={{
                    sx: {
                        color: "#264653",
                        fontWeight:"bold", 
                        fontSize: "16px"
                    }
                }}
                subheaderTypographyProps={{
                    sx: {
                        color: "#000507",
                        fontSize: "12px",
                    }
                }}
            />
            <CardContent
                sx={{display:"flex"}}
            >
                {_.map(templateSamples[template], (image) => {
                    return(
                        <CardActionArea
                            sx={{width:"300px", mr: "10px"}}
                            onClick={handleOnClick}
                        >
                            <img
                                key={image}
                                src={require(`../../Assets/TemplateSamples/${template}/${image}.png`)}
                                alt={image}
                                style={{width: "300px"}}
                            />
                        </CardActionArea>   
                    )
                })     
                }
            </CardContent>
            <Dialog
                open={open}
                fullWidth
            >
                <DialogContent
                    sx={{p: "10px 10px 20px 10px"}}
                    id="templateSelected" 
                >
                    <Box
                        sx={{
                            display:"flex", 
                            justifyContent:"flex-end",
                        }}
                    >
                        <Button
                            onClick={()=>setOpen(false)}
                            sx={{minWidth:"10px"}}
                        >
                            <GrClose style={{pointerEvents:"none"}}/>
                        </Button>
                    </Box>
                    { open ?
                        <Box
                            sx={{
                                display:"flex",
                                justifyContent:"center",  
                            }}

                        >
                            <img 
                                src={require(`../../Assets/TemplateSamples/${template}/${expandImage}.png`)}
                                alt={expandImage}
                                style={{
                                    height:"100%",
                                    width: "500px",
                                    border:"solid grey 1px",
                                }}
                            />
                        </Box>
                        : <></>
                    }
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default TemplateCard;

