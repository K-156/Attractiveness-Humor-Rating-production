import { Box } from "@mui/material";

import Instruction from "../../Components/Instruction/Instruction";
import NextButton from "../../Components/NavButton/NextButton";
import { ReactComponent as ProfileImage } from "../../Assets/profile-instruction.svg";

const instruction="Lorem ipsum dolor sit amet consectetur adipisicing elit. " + 
"Autem magnam sequi est. Consectetur voluptates suscipit officia ipsa rerum," +
"distinctio et minus quas beatae iusto? Perspiciatis commodi nostrum eum facere beatae atque" +
"culpa sit iusto quod accusantium laboriosam porro praesentium nobis quam dolorem possimus delectus voluptatibus dicta esse," +
"Autem magnam sequi est. Consectetur voluptates suscipit officia ipsa rerum, distinctio et minus quas beatae iusto?" +
"minima unde architecto.Lorem ipsum dolor sit amet consectetur adipisicing elit. "

const AttractiveInstruction = () => {
    return(
        <div style={{display:"flex",  flexDirection:"column", alignItems: "center"}} >
            <script>
                {document.title="Instruction"}
            </script>
            <ProfileImage width="20%" height="0%" style={{margin: "20px"}}/>
            <Instruction text={instruction}/>
            <Box py={2} px={10} display="flex" justifyContent="flex-end" width="100%">
                <NextButton link="attractive/profile"/>
            </Box>
        </div>
    )
}

export default AttractiveInstruction;