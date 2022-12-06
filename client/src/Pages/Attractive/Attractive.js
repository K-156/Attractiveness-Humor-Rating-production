import { useState } from "react";

import { Box, Grid } from "@mui/material";
import _ from "lodash";

import Instruction from "../../Components/Instruction/Instruction";
import ItemCard from "../../Components/ItemCard/ItemCard";
import NextButton from "../../Components/NavButton/NextButton";
import { isAllAnswer } from "../../Utils/isAllAnswer";

const instruction="Click on the company logo to find out more about the company.\n" + 
"After reading their profiles, rate the companies based on how attractive they are to you.\n" +
"(1 - extremely unattracted, 9 - extremely attracted)"

const itemName = [{
        name: "DBS Bank Private", 
        img: "DBS logo.png"
    }, {
        name: "SeaMoney", 
        img: "SeaMoney logo.png"
    }, {
        name: "SMU Institute of Service Excellence", 
        img: "SMU ISE logo.jpg"
    }, {
        name: "Integrated Health Information System", 
        img: "IHIS logo.png"
    }
]

const Attractive = () => {

    const [rating, setRating] = useState();

    return(
        <div>
        <script>
            {document.title="Attractiveness"}
        </script>

        <Instruction text={instruction} />
        <Grid container spacing={1} py={2}> 
            {_.map(itemName, (item) => {
                return(
                    <Grid item key={item.name} xs={3}> 
                        <ItemCard   
                            title={item.name} 
                            img={item.img} 
                            setRating={setRating}
                        />
                    </Grid>
                )
            })}
        </Grid>   
        <Box display="flex" justifyContent="flex-end">
            <NextButton 
                disabled={isAllAnswer(rating, 4)}
                link="audio" 
                rating={rating}
                ratingType="attractRating"
            />
        </Box>
        </div>
    )
}

export default Attractive;