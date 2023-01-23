import { useState } from "react";

import { Button, Box } from "@mui/material";
import _ from "lodash";

import TemplateCard from "../../Components/TemplateCard/TemplateCard";
import { templates } from "../../Utils/templateList";
import SampleDialog from "../../Components/SampleDialog/SampleDialog";

const templatePurpose = {
    1: "Add profiles",
    2: "Rate the profiles",
    3: "Drag and drop to rank the profiles",
    4: "Listen to audio and answer the questions", 
    5: "Read the introduction and answer the questions",
    6: "Select one pre-written message to the candidate",
    7: "Customise text"
}

const templateSamples = {
    1: ["1_Profile Summary Page", "2_Profile Description Page"],
    2: ["1_Profile Rating Page"],
    3: ["1_Rank Page", "2_Rank Page (dragged)"],
    4: ["1_Audio Page", "2_Audio Rating Page"], 
    5: ["1_Written Intro Page"],
    6: ["1_Pre-written message Page", "2_Pre-written message Page (Selected)"],
    7: ["1_Complete survey Page"]
}

const Templates = () => {

    const [open, setOpen] = useState(false);
    const [templateNum, setTemplateNum] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);

    const handleExpandImage = (event) => {
        setOpen(true);          
        setTemplateNum(event.target.name[9]);
        setImageIndex(event.target.alt);
    }

    return(
    <div>
        <script>
            {document.title = "Template Samples"}
        </script>
        <Box className="flexEnd">
            <Button 
                variant="contained"
                className="customButton-green"
                onClick={() => window.close()}
            >
                Close
            </Button>
        </Box>
       
        {_.map(_.range(1,8), (num)=> {
            return(
                <TemplateCard 
                    key={num}
                    title={templates[num]}
                    subheader={templatePurpose[num]}
                    imageList={templateSamples[num]}
                    imagePath={`TemplateSamples/${num}`}
                    handleExpandImage={handleExpandImage}
                />
            )   
        })
        }
        <SampleDialog 
            open={open}
            setOpen={setOpen}
            imageList={templateSamples[templateNum]}
            imageIndex={imageIndex}
            imagePath={`TemplateSamples/${templateNum}`}
        />
        
    </div>
    )
}

export default Templates;