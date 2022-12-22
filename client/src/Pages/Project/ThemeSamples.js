import _ from "lodash";

import PrevButton from "../../Components/NavButton/PrevButton";
import TemplateCard from "../../Components/TemplateCard/TemplateCard";

const Themes =  () => {

    const sampleList = ["1_Landing Page", "2_Login", "3_Instruction", "4_Profile", "5_Rank", "6_Chatbox"]
    const themeList = ["Blue", "Brown", "Green", "Pink", "Yellow"]

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
                    />
                )
            })
            }
        </div>

    )
}

export default Themes;