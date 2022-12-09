import { Outlet } from "react-router-dom";

import Timer from "../Components/Timer/Timer";

const SurveyLayout = () => {
    return(
        <>
        <Timer />
        <Outlet />
        </>
    )
}

export default SurveyLayout;