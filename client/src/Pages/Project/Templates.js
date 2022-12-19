import _ from "lodash";

import TemplateCard from "../../Components/TemplateCard/TemplateCard";
import PrevButton from "../../Components/NavButton/PrevButton";

const Templates = () => {
    return(
    <>
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
                    template={num}
                />
            )   
        })
        }
        
    </>
    )
}

export default Templates;