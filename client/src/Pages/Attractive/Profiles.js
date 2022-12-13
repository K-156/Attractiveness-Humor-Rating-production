import { Box, Grid } from "@mui/material";
import _ from "lodash";

import ItemCard from "../../Components/ItemCard/ItemCard";
import NextButton from "../../Components/NavButton/NextButton";
import PrevButton from "../../Components/NavButton/PrevButton";
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

const Profiles = () => {

    return(
        <div>
        <script>
            {document.title="Attractiveness"}
        </script>
        <Instruction type="attractive" />
        <Grid container spacing={1} py={2}> 
            {_.map(itemName, (item, index) => {
                return(
                    <Grid item key={item.name} xs={3}> 
                        <ItemCard   
                            id={index}
                            title={item.name} 
                            img={item.img} 
                            candidateCount={Object.keys(itemName).length}
                        />
                    </Grid>
                )
            })}
        </Grid>   
        <Box display="flex" justifyContent="space-between">
            <PrevButton 
                link="attractive" 
            />
            <NextButton 
                link="attractive/rate" 
            />
        </Box>
        </div>
    )
}

export default Profiles;