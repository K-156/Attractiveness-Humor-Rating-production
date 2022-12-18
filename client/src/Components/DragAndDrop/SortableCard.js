import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ItemCard from "../ItemCard/ItemCard";


const info = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
"suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi nostrum eum facere beatae " +
"atque culpa sit iusto quod accusantium "

const SortableCard = ({ id, title, img, candidateCount }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Box width="100px" height="100px">
            <ItemCard
                title={title}
                img={img}
                id={id}
                candidateCount={candidateCount}
                description={info}
                back={location.pathname}
            />
            </Box>
           
        </div>
    )
}

export default SortableCard;