import { useState } from "react";

import _ from "lodash";

import TemplateCard from "../../Components/TemplateCard/TemplateCard";
import PrevButton from "../../Components/NavButton/PrevButton";
import { templates } from "../../Utils/templateList";
import SampleDialog from "../../Components/SampleDialog/SampleDialog";

const templatePurpose = {
    1: "View and rate the profiles",
    2: "Drag and drop to rank the profiles",
    3: "Listen to audio and answer the questions", 
    4: "Read the introduction and answer the questions",
    5: "Select one pre-written message to the candidate",
    6: "Customise text"
}

const templateSamples = {
    1: ["1_Profile Summary Page", "2_Profile Description Page", "3_Profile Rating Page"],
    2: ["1_Rank Page", "2_Rank Page (dragged)"],
    3: ["1_Audio Page", "2_Audio Rating Page"], 
    4: ["1_Written Intro Page"],
    5: ["1_Pre-written message Page", "2_Pre-written message Page (Selected)"],
    6: ["1_Complete survey Page"]
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
        <PrevButton 
            text="Back"
            link="/projects/sections"
        />
        {_.map(_.range(1,7), (num)=> {
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