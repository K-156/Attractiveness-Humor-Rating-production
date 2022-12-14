import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./ItemCard.css";

const info = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
"suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi nostrum eum facere beatae " +
"atque culpa sit iusto quod accusantium "

const ItemCard = ({ title, img, id, isSelect, candidateCount }) => {

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
            <ItemCard
                title={title}
                img={img}
                id={id}
                candidateCount={candidateCount}
                description={info}
                back={location.pathname}
            />
        </div>
    )
}

export default ItemCard;