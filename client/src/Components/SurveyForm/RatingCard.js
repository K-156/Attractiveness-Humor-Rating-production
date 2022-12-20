import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

import { 
    Box, 
    Card, 
    CardContent, 
    FormControl,
    Typography, 
    TextField 
} from "@mui/material";

import { colorPalette } from "../../Utils/colorPalette";

const RatingCard = ({ title, img, id, setRating, description }) => {

    const { theme } = useAppContext();
    
    const [error, setError] = useState(false);
    const handleOnChange = (event) => {
        const value = event.target.value;
        if (value < 1 || value >  9) {
            setError(true) 
            return
        } else {
            setError(false)
        }

        setRating((state) => ({
            ...state, 
            [id] : event.target.value
        }))

    }
    
    return(
        <Card>
            <CardContent>
                <Typography 
                    className="cardHeader"
                    sx={{color: colorPalette[theme]["primary"]}}
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
                <FormControl fullWidth>
                    <TextField
                        required
                        id={id.toString()}
                        label="Rate"
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 9} }}
                        onChange={handleOnChange}
                        error={error}
                        helperText={error ? "Rating out of range" : " "}
                    />
                </FormControl>
            </CardContent>        
        </Card>
    )
}

export default RatingCard;