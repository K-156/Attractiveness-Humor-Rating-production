import { Box, Card, CardContent, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./ItemCard.css";

const info = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
"suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi nostrum eum facere beatae " +
"atque culpa sit iusto quod accusantium "

const ItemCard = ({ title, img, id, isSelect }) => {

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

    console.log(isSelect)

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card sx={{backgroundColor: isSelect[id] !== undefined ? "#f2e5d0" : "#FFFFFF"}}>
                <CardContent>
                    <Typography variant="subtitle2" fontWeight="bold" className="cardHeader">
                        {title}
                    </Typography>
                    <Box display="flex" justifyContent="center" height="200px" py={2}>
                        <img 
                            id={title} 
                            src={require(`../../Assets/Candidates/${img}`)} 
                            alt="profile" 
                        />
                    </Box>
                    <Typography variant="subtitle2" textAlign="center" my={2}>{info}</Typography>
                </CardContent>            
            </Card>
        </div>
    )
}

export default ItemCard;