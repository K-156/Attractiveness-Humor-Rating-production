import { useState } from "react";

import { Box, Grid, Typography } from "@mui/material";
import _ from "lodash";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

import RankCard from "../../Components/ItemCard/RankCard";
import Instruction from "../../Components/Instruction/Instruction";
import NextButton from "../../Components/NavButton/NextButton";
import { ReactComponent as Arrow } from "../../Assets/arrow.svg";


const instruction = "Drag and drop the candidates to rank them, with the most interested candidate on the left."

const allItems = [{
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


const Rank = () => {

    const [itemName, setItemName] = useState(allItems)
    const [isSelect, setIsSelect] = useState({})

    const handleDragEnd = (event) => {
        const {active, over} = event;
        if (active.id !== over.id) {
            setItemName((allItems) => {
                const activeIndex = Object.keys(allItems).findIndex((id) => id === active.id);
                const overIndex = Object.keys(allItems).findIndex((id) => id === over.id);
                return(arrayMove(allItems, activeIndex, overIndex))
            })
        }
        setIsSelect({})  
    }

    const handleDragOver = (event) => {
        const {active, over} = event;
        if (active.id !== over.id) {
            setIsSelect((state) => ({ ...state, [active.id]: true }))
        }
    }

    return (
        <div>
            <script>
                {document.title="Profile Rating"}
            </script>
            <Instruction type="rank" />
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragOver}
            >
            <Grid container spacing={1} py={2}>
                <Grid item xs={12}>
                </Grid>
                <SortableContext
                    items={Object.keys(itemName)}
                    strategy={horizontalListSortingStrategy}
                >
                    {_.map(Object.keys(itemName), (key) => {
                        return(
                            <Grid item key={key} xs={3}> 
                            <RankCard  
                                id={key}
                                title={itemName[key]["name"]} 
                                img={itemName[key]["img"]} 
                                isSelect={isSelect}
                            />
                            </Grid>
                        )
                    })}
                </SortableContext>
            </Grid>
            </DndContext>

            <Arrow style={{width:"100%"}}/>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle2" fontWeight="bold" color="#717171">Most Interested</Typography>
                <Typography variant="subtitle2" fontWeight="bold" color="#717171">Least Interested</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={3}>
                <NextButton 
                    link="audio-instruction"
                    ratingType="rank"
                    storeItem={JSON.stringify({most: itemName[0], least: itemName[Object.keys(itemName).length-1]})}
                />
            </Box>
        </div>
    )
}

export default Rank;