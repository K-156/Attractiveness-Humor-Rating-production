import { useLocation } from "react-router-dom";

const Section = () => {
    
    const location = useLocation()
    const sectionNum = location.pathname.split("/").pop()

    return(
        <>section</>
    )
}

export default Section;