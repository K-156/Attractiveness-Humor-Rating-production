import { useState } from "react";

import { Box, Card, Grid, Typography } from "@mui/material";
import _ from "lodash";

import RatingCard from "../../Components/Form/RatingCard";
import NextButton from "../../Components/NavButton/NextButton";
import PrevButton from "../../Components/NavButton/PrevButton";
import { isValid } from "../../Utils/isValid";


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
    const [isSubmit, setIsSubmit]= useState(false);

    return (
        <div>
            <script>
                {document.title="Profile Rating"}
            </script>
            <Box display="flex" justifyContent="center">
                <Card sx={{background: "#264653", color:"#FFFFFF", display: "inline-block", px: 10}} >
                    <Typography display="flex" justifyContent="center" sx={{p:"10px"}} variant="subtitle2">
                        1 - extremely uninterested, 9 - extremely interested
                    </Typography>
                </Card>
            </Box>
            <Grid container spacing={1} py={2}> 
            {_.map(itemName, (item, index) => {
                return(
                    <Grid item key={item.name} xs={3}> 
                        <RatingCard   
                            id={index}
                            title={item.name} 
                            img={item.img} 
                            setRating={setRating}
                            isSubmit={isSubmit}
                            setIsSubmit={setIsSubmit}
                            rating={rating[index.toString()]}
                        />
                    </Grid>
                )
            })}
        </Grid>
        <Box display="flex" justifyContent="space-between">
            <PrevButton link="attractive/profile"/>
            <NextButton 
                setIsSubmit={setIsSubmit}
                isSubmit={isSubmit}
                isValid={isValid(rating, Object.keys(itemName).length)}
                link="attractive/rank"
            />
        </Box>   
        </div>
    )
}

export default AttractiveRate;