import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import { 
    Box, 
    Button, 
    Card,
    CardContent,
    Typography 
} from "@mui/material";

import "./ItemCard.css";
import { colorPalette } from "../../Utils/colorPalette";


const ItemCard = ({ title, img, id, candidateCount, description, back }) => {

    const { theme } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleOnClick = (event) => {
        navigate(`/attractive/profile/${parseInt(event.target.id)+1}`, {
            state: {
                id: `${event.target.id}`,
                candidateCount: {candidateCount},
                back: back !== undefined ? back : location.pathname 
            }
        })
    }
        
    return(
        <Card>
            <CardContent>
                <Typography 
                    className="cardHeader"
                    sx={{color:colorPalette[theme]["primary"]}}
                >
                    {title}
                </Typography>
                <Box className="imageBox">
                    <img 
                        id={title} 
                        src={img} 
                        alt="profile" 
                    />
                </Box>
                <Typography className="cardContent">{description}</Typography>
                <Box className="center">
                    <Button
                        variant="contained"
                        onClick={handleOnClick}
                        id={id}
                        className={`customButton-${theme}`}
                    >
                        View Profile
                    </Button>
                    </Box> 
            </CardContent>        
        </Card>
    )
}

export default ItemCard;