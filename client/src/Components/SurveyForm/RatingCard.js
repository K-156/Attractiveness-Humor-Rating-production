import { useAppContext } from "../../Context/AppContext";

import { 
    Box, 
    Card, 
    CardContent, 
    FormControl,
    MenuItem,
    Typography, 
    TextField 
} from "@mui/material";
import _ from "lodash";

import { colorPalette } from "../../Utils/colorPalette";

const range = {
    lower: {number: 1, text: "not interested"}, 
    upper: {number: 9, text: "extremely interested"}, 
}

const RatingCard = ({ title, img, id, setRating, description }) => {

    const { theme } = useAppContext();

    const handleOnChange = (event) => {
        setRating((state) => ({
            ...state, 
            [String(id)] : event.target.value
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
                        fullWidth
                        select
                        id="rate"
                        label="Rate"
                        defaultValue=""
                        onChange={handleOnChange}
                    >
                        {_.map(_.range(range["lower"]["number"], range["upper"]["number"] + 1), (num) => {
                        return (
                            <MenuItem 
                                key={num} 
                                id={num} 
                                value={num}
                            >
                                {num} 
                                {num === range["lower"]["number"] ? ` (${range["lower"]["text"]})` :
                                  num === range["upper"]["number"] ? ` (${range["upper"]["text"]})` : "" }
                            </MenuItem>
                        );
                        })}
                    </TextField>
                </FormControl>
            </CardContent>        
        </Card>
    )
}

export default RatingCard;