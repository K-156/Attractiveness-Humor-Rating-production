import { useEffect, useState } from "react";

import { Box, Card, CardContent, FormControl, Typography, TextField } from "@mui/material";
import _ from "lodash";

const info = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. Consectetur voluptates " +
"suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? Perspiciatis commodi nostrum eum facere beatae " +
"atque culpa sit iusto quod accusantium "

const ItemCard = ({ title, img, id, setRating, isSubmit, rating, setIsSubmit}) => {
    
    const handleOnChange = (event) => {
        setRating((state) => ({
            ...state, 
            [id] : event.target.value
        }))
        setIsSubmit(false)
    }

    const [error, setError] = useState({isEmpty: false, withinRange: false});
    useEffect(() => {
        if (isSubmit && (rating === "" || rating === undefined)) {
            setError((state) => ({... state, isEmpty: true}))
        } else if ( rating < 0 || rating > 9) {
            setError((state) => ({... state, withinRange: true}))
        } else {
            setError({isEmpty: false, withinRange: false})
        }
    }, [isSubmit, rating]) 

    
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
                        id={id.toString()}
                        label="Rate"
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 9} }}
                        onChange={handleOnChange}
                        error={error.isEmpty || error.withinRange}
                        helperText={error.isEmpty ? "Enter your rating" 
                                    : error.withinRange ? "Rating out of range" : " "}
                    />
                </FormControl>
            </CardContent>        
        </Card>
    )
}

export default ItemCard;