import { useState } from "react";

import { Box, Grid } from "@mui/material";
import _ from "lodash";

import RatingCard from "../../Components/Form/RatingCard";
import NextButton from "../../Components/NavButton/NextButton";
import PrevButton from "../../Components/NavButton/PrevButton";
import { isValid } from "../../Utils/isValid";
import Instruction from "../../Components/Instruction/Instruction";


const itemName = [{
    name: "Candidate 1", 
    img: "Female 1.jpg"
}, {
    name: "Candidate 2", 
    img: "Female 2.jpg"
}, {
    name: "Candidate 3", 
    img: "Female 3.jpg"
}, {
    name: "Candidate 4", 
    img: "Female 4.jpg"
}
]


const AttractiveRate = () => {

    const [rating, setRating] = useState({});

    return (
        <div>
            <script>
                {document.title="Profile Rating"}
            </script>
            <Instruction type="attractive"/>
            <Grid container spacing={1} py={2}> 
            {_.map(itemName, (item, index) => {
                return(
                    <Grid item key={item.name} xs={3}> 
                        <RatingCard   
                            id={index}
                            title={item.name} 
                            img={item.img} 
                            setRating={setRating}
                        />
                    </Grid>
                )
            })}
        </Grid>
        <Box display="flex" justifyContent="space-between">
            <PrevButton link="attractive/profile"/>
            <NextButton 
                disabled={!isValid(rating, Object.keys(itemName).length)}
                link="attractive/rank"
            />
        </Box>   
        </div>
    )
}

export default AttractiveRate;