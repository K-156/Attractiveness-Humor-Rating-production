import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

import { 
    Box, 
    Button, 
} from "@mui/material";
import _ from "lodash";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import Instruction from "../../Components/Instruction/Instruction";
import NextButton from "../../Components/NavButton/NextButton";
import DragAndDrop from "../../Components/DragAndDrop/DragAndDrop";

// const instruction = "Drag and drop the candidates to rank them, with the most interested candidate on the left."

const mockdata = [{
    _id: 1, 
    name: "Candidate 1", 
    img: "../../Assets/Candidates/Female 1.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
                "suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi"
}, {
    _id: 2, 
    name: "Candidate 2", 
    img: "../../Assets/Candidates/Female 2.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
                "suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi"
}, {
    _id: 3, 
    name: "Candidate 3", 
    img: "../../Assets/Candidates/Female 3.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
                 "suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi"
}, {
    _id: 4, 
    name: "Candidate 4", 
    img: "../../Assets/Candidates/Female 4.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
    "suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi"
}
]

const Rank = () => {

    const { theme } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [allItems, setAllItems] = useState(mockdata);
    const [items, setItems] = useState(mockdata);
    const [rankItems, setRankItems] = useState([]); 

    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data)

    return (
        <div>
            <script>
                {document.title="Profile Ranking"}
            </script>
            <Box className="spaceBetween" sx={{width: "250px"}}>
                <Instruction type="rank" />
                <Button
                variant="contained"
                className={`customButton-${theme}`}
                onClick={() => {
                    navigate("/profiles", {
                    state: {
                        link: location.pathname,
                        type: "Rank"
                    }})
                    }}
                >
                View Profiles
                </Button>
            </Box>
            <DragAndDrop 
                items={items}
                setItems={setItems}
                rankItems={rankItems}
                setRankItems={setRankItems}
                allItems={allItems}
            />
            <Box className="flexEnd" sx={{mt: 3}}>
                <NextButton 
                    link="/audio-instruction"
                    disabled={rankItems.length < allItems.length}
                    ratingType="rank"
                    isSurvey={true}
                    storeItem={JSON.stringify({most: rankItems[0], least: rankItems[rankItems.length-1]})}
                />
            </Box>
        </div>
    )
}

export default Rank;
