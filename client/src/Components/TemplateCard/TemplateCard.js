import { useState } from "react";

import { 
    Card, 
    CardActionArea, 
    CardContent, 
    CardHeader,
    Dialog,
    DialogContent,
} from "@mui/material";
import _ from "lodash";
import { CgClose } from "react-icons/cg";

import { templates, templatePurpose, templateSamples} from "../../Utils/templateList";

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
        <Card sx={{my: 2}}>
            <CardHeader
                title={templates[template]}
                subheader={templatePurpose[template]}
                sx={{pb:0}}
                titleTypographyProps={{ className: "summaryHeader" }}
                subheaderTypographyProps={{
                    sx: {
                        color: "#000507",
                        fontSize: "14px",
                    }
                }}
            />
            <CardContent sx={{display:"flex"}} >
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
                fullScreen
                PaperProps={{
                    sx:{backgroundColor:"transparent"}
                }}
            >   
                <DialogContent className="center">
                    { open ?
                        <img 
                            src={require(`../../Assets/TemplateSamples/${template}/${expandImage}.png`)}
                            alt={expandImage}
                            style={{height:"100%"}}
                        />
                        : <></>
                    }
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
                </DialogContent>
                
            </Dialog>
        </Card>
    )
}

export default TemplateCard;

