
import { Box } from "@mui/material";

import Instruction from "../../Components/Instruction/Instruction";
import PrevButton from "../../Components/NavButton/PrevButton";
import NextButton from "../../Components/NavButton/NextButton";
import { ReactComponent as AudioPlayer } from "../../Assets/audio-player.svg";




const instruction="You will be listening to FOUR different audios by the companies that you have selected the most and least attractive just now.\n" + 
"After listening to the audio, answer the questions below the audio player.\n" +
"(1 - extremely unattractive, 9 - extremely attractive)"

const Audio = () => {

    return(
        <div style={{display:"flex",  flexDirection:"column", alignItems: "center"}} >
            <script>
                {document.title="Audio"}
            </script>
            <AudioPlayer width="20%" height="0%" style={{margin: "20px"}}/>
            <Instruction text={instruction}/>
            <Box py={2} px={10} display="flex" justifyContent="space-between" width="100%">
                <PrevButton />
                <NextButton link="audio/q1"/>
            </Box>
        </div>
    )
}

export default Audio;