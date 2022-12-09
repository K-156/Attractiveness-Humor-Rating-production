import { useState } from "react";

import { Box, Card, Grid, Typography } from "@mui/material";

import PrevButton from "../../Components/NavButton/PrevButton";
import NextButton from "../../Components/NavButton/NextButton";
import AudioForm from "../../Components/Form/AudioForm";
import { isAllAnswer } from "../../Utils/isAllAnswer";


const AudioQn = ({ title, link, ratingType}) => {

    const [rating, setRating] = useState();

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
                        src="../..Assets/Audio/test.mp3" 
                        preload="auto"
                    />
                </Grid>
                <Grid item xs={7} px={4}> 
                    <Card sx={{background: "#264653", color:"#FFFFFF", mb:2}} >
                            <Box display="flex" justifyContent="center" sx={{p:"10px"}}>
                                <Typography>1 - not very, 9 - extremely</Typography>
                            </Box>
                    </Card>
                    <AudioForm setRating={setRating} data={ratingType} />
                </Grid>
                <Grid item xs={12} py={2} px={9} display="flex" justifyContent="space-between">
                    <PrevButton link={parseInt(title) === 1 ? "audio-instruction" : "audio/q1"}/>
                    <NextButton 
                        disabled={isAllAnswer(rating, 5)}
                        link={link}
                        rating={rating}
                        ratingType={ratingType}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default AudioQn;