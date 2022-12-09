import { useState } from "react";

import { Box, Grid } from "@mui/material";

import PrevButton from "../../Components/NavButton/PrevButton";
import NextButton from "../../Components/NavButton/NextButton";
import AudioForm from "../../Components/Form/AudioForm";
import { isValid } from "../../Utils/isValid";

const ques = {
    "q1" : "How funny (humorous) am I?", 
    "q2" : "Do I have a good sense of humor?", 
    "q3" : "How emotionally express am I?", 
    "q4" : "Would I be a warm person to others?", 
    "q5" : "Do I seem intelligent?", 
    "q6" : "Do I seem hardworking?", 
    "q7" : "How interested are you in me?", 
}


const AudioRate = ({ title, link }) => {

    const [rating, setRating] = useState({});
    const [isSubmit, setIsSubmit]= useState(false);

    console.log(rating)

    return(
        <div>
            <script>
                {document.title=`Audio ${title}`}
            </script>
            <Grid container className="center" gap={2}>
                <Grid item xs={4} px={4}> 
                    <Box display="flex" justifyContent="center" height="200px" py={2}>
                        <img src={require("../../Assets/Logo/DBS logo.png")} alt="logo" />
                    </Box>
                    <audio
                        controls
                        // src="../..Assets/Audio/test.mp3" 
                        preload="auto"
                    />
                </Grid>
                <Grid item xs={7} px={4}> 
                    <AudioForm 
                        ques={ques}
                        setRating={setRating}
                        rating={rating}
                        isSubmit={isSubmit}
                        setIsSubmit={setIsSubmit}
                    />
                </Grid>
                <Grid item xs={12} py={2} px={9} display="flex" justifyContent="space-between">
                    {parseInt(title) === 1 ?
                        <PrevButton link="audio-instruction" />
                        : <Box></Box>
                    }
                    <NextButton 
                        setIsSubmit={setIsSubmit}
                        isSubmit={isSubmit}
                        isValid={isValid(rating, Object.keys(ques).length)}
                        link={link}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default AudioRate;