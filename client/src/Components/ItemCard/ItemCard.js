import { useNavigate } from "react-router-dom";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import "./ItemCard.css";


const ItemCard = ({ title, img, id, candidateCount, description}) => {
    
    const navigate = useNavigate();
    const handleOnClick = (event) => {
        navigate(`/attractive/profile/${parseInt(event.target.id)+1}`, {
            state: {
                id: `${event.target.id}`,
                candidateCount: {candidateCount}
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
                <Typography variant="subtitle2" textAlign="center" my={2}>{description}</Typography>
                <Box display="flex" justifyContent="center">
                    <Button
                        onClick={handleOnClick}
                        id={id}
                        sx={{background: "#264653", color:"#FFFFFF", '&:hover': {backgroundColor:"#C59D5F"}}}
                    >
                        View Profile
                    </Button>
                    </Box> 
            </CardContent>        
        </Card>
    )
}

export default ItemCard;