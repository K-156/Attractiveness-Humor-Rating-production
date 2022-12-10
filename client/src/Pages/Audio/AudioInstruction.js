import { Box } from "@mui/material";

import Instruction from "../../Components/Instruction/Instruction";
import NextButton from "../../Components/NavButton/NextButton";
import { ReactComponent as AudioPlayer } from "../../Assets/audio-player.svg";


const instruction="You will be listening to FOUR different audios by the companies that you have selected the most and least attractive just now.\n" + 
"After listening to the audio, answer the questions below the audio player.\n" +
"(1 - extremely unattractive, 9 - extremely attractive)"

const Audio = () => {

    return(
        <div style={{display:"flex",  flexDirection:"column", alignItems: "center"}} >
            <script>
                {document.title="Instruction"}
            </script>
            <AudioPlayer width="20%" height="0%" style={{margin: "20px"}}/>
            <Instruction text={instruction}/>
            <Box py={2} display="flex" justifyContent="flex-end" width="80%">
                <NextButton link="audio/q1"/>
            </Box>
        </div>
    )
}

export default Audio;