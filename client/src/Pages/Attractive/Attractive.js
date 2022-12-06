import { Box, Grid } from "@mui/material";
import _ from "lodash";


import Instruction from "../../Components/Instruction/Instruction";
import ItemCard from "../../Components/ItemCard/ItemCard";
import NextButton from "../../Components/NavButton/NextButton";
import PrevButton from "../../Components/NavButton/PrevButton";

const instruction="Click on the company logo to find out more about the company.\n" + 
"After reading their profiles, rate the companies based on how attractive they are to you.\n" +
"(1 - extremely unattracted, 9 - extremely attracted)"

const itemName = [{
        name: "DBS Bank Private", 
        img: "./"
    }, {
        name: "SeaMoney", 
        img: "./"
    }, {
        name: "SMU Institute of Service Excellence", 
        img: "./"
    }, {
        name: "Integrated Health Information System", 
        img: "./"
    }
]

const Attractive = () => {
    return(
        <>
        <Instruction text={instruction} />
        <Grid container spacing={1} py={2}> 
            {_.map(itemName, (item) => {
                return(
                    <Grid item key={item.name} xs={3}> 
                        <ItemCard title={item.name}/>
                    </Grid>
                )
            })}
        </Grid>   
        <Box display="flex" justifyContent="flex-end">
            <NextButton link="audio" />
        </Box>
        </>
    )
}

export default Attractive;