import { useState } from "react";

import { Box, Grid } from "@mui/material";

import PrevButton from "../../Components/NavButton/PrevButton";
import NextButton from "../../Components/NavButton/NextButton";
import AudioForm from "../../Components/Form/AudioForm";
import { isValid } from "../../Utils/isValid";
import IntroMessage from "../../Components/Message/IntroMessage";
import Instruction from "../../Components/Instruction/Instruction";

// const ques = {
//     "q1" : "How funny (humorous) am I?", 
//     "q2" : "Do I have a good sense of humor?", 
//     "q3" : "How emotionally express am I?", 
//     "q4" : "Would I be a warm person to others?", 
//     "q5" : "Do I seem intelligent?", 
//     "q6" : "Do I seem hardworking?", 
//     "q7" : "How interested are you in me?", 
// }

const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
"suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi nostrum eum facere beatae " +
"atque culpa sit iusto quod accusantium "

const AudioRate = ({ title, link, isWritten }) => {

    const [rating, setRating] = useState({});

    const data = JSON.parse(localStorage.getItem("data"));

    return(
        <div>
            <script>
                {document.title= isWritten ? `Introduction ${title}` : `Audio ${title}`}
            </script>
            <Instruction type={isWritten ? "intro" : "audio"} />
            <Grid container className="center" gap={2}>
                <Grid item xs={4} px={4}> 
                    <Box display="flex" justifyContent="center" height="200px" py={2}>
                        <img src={require("../../Assets/Logo/DBS logo.png")} alt="logo" />
                    </Box>
                    { isWritten ? <IntroMessage text={text}/>
                      : <audio
                            controls
                            // src=" ../..Assets/Audio/test.mp3" 
                            preload="auto"
                        />
                    }
                </Grid>
                <Grid item xs={7} px={4}> 
                    <AudioForm 
                        ques={data.audioRatingInstruc}
                        setRating={setRating}
                        isWritten={isWritten}
                    />
                </Grid>
                <Grid item xs={12} py={2} px={9} display="flex" justifyContent="space-between">
                    {parseInt(title) === 1 ?
                        <PrevButton link="audio-instruction" />
                        : <Box></Box>
                    }
                    <NextButton 
                        disabled={!(isValid(rating, Object.keys(data.audioRatingInstruc).length))}
                        link={link}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default AudioRate;