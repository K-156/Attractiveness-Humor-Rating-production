import { useState } from "react";

import { Box, Card, CardContent, FormControl, Typography, TextField } from "@mui/material";

const RatingCard = ({ title, img, id, setRating, description }) => {
    
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