import { useNavigate, useLocation } from "react-router-dom";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import "./ItemCard.css";


const ItemCard = ({ title, img, id, candidateCount, description, back }) => {
    
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
                <Typography variant="subtitle2" fontWeight="bold" className="cardHeader">
                    {title}
                </Typography>
                <Box display="flex" justifyContent="center" height="200px" py={2}>
                    <img 
                        id={title} 
                        src={img} 
                        alt="profile" 
                    />
                </Box>
                <Typography variant="subtitle2" textAlign="center" my={2} height="260px">{description}</Typography>
                <Box display="flex" justifyContent="center">
                    <Button
                        variant="contained"
                        onClick={handleOnClick}
                        id={id}
                        className="customButton"
                    >
                        View Profile
                    </Button>
                    </Box> 
            </CardContent>        
        </Card>
    )
}

export default ItemCard;