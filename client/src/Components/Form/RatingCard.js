import { useState } from "react";

import { Box, Card, CardContent, FormControl, Typography, TextField } from "@mui/material";

const info = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
"suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi nostrum eum facere beatae " +
"atque culpa sit iusto quod accusantium "

const ItemCard = ({ title, img, id, setRating }) => {
    
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
                        src={require(`../../Assets/Candidates/${img}`)} 
                        alt="profile" 
                    />
                </Box>
                <Typography variant="subtitle2" textAlign="center" my={2}>{info}</Typography>
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

export default ItemCard;