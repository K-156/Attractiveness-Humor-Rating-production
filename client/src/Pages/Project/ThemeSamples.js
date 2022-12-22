import { useState } from "react";
import _ from "lodash";

import PrevButton from "../../Components/NavButton/PrevButton";
import TemplateCard from "../../Components/TemplateCard/TemplateCard";
import SampleDialog from "../../Components/SampleDialog/SampleDialog";

const sampleList = ["1_Landing Page", "2_Login", "3_Instruction", "4_Profile", "5_Rank", "6_Chatbox"]
const themeList = ["Blue", "Brown", "Green", "Pink", "Yellow"]

const Themes =  () => {

    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState("Green");
    const [imageIndex, setImageIndex] = useState(0);

    const handleExpandImage = (event) => {
        setOpen(true);          
        setTheme(event.target.name);
        setImageIndex(event.target.alt);
    }

    return (
        <div>
            <script>{document.title="Themes Samples"}</script>
            <PrevButton 
                text="Back"
                link="/projects/details"
            />
            {_.map(themeList, (theme) => {
                return(
                    <TemplateCard
                        key={theme}
                        title={theme}
                        imageList={sampleList}
                        imagePath={`Theme/${theme.toLowerCase()}/Samples`}
                        handleExpandImage={handleExpandImage}
                    />
                )
            })
            }
            <SampleDialog 
            open={open}
            setOpen={setOpen}
            imageList={sampleList}
            imageIndex={imageIndex}
            imagePath={`Theme/${theme.toLowerCase()}/Samples`}
        />
        </div>

    )
}

export default Themes;