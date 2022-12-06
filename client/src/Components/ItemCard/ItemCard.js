import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Box, Card, CardContent, Typography, TextField, Autocomplete, CardActionArea } from "@mui/material";
import _ from "lodash";

import "./ItemCard.css";

const ItemCard = ({ title, img, setRating }) => {

    const navigate = useNavigate();
    const handleOnClick = (event) => {
        navigate(`/attractive/${event.target.id}`, {
            state: {
                id: `${event.target.id}`
            }
        })
    }
    
    const handleChange = (event) => {
        setRating((state) => ({
            ...state, 
            [title] : event.target.textContent
        }))
        getDefaultValue();

    }

    const attractRating = sessionStorage.getItem("attractRating");
    useEffect(() => {
        if (attractRating !== null) {
            setRating(JSON.parse(attractRating))
        }
    }, []);
    const getDefaultValue = () => {
        if (attractRating === null) { 
            return "";
        } 
        const jsonRating = JSON.parse(attractRating)
        return jsonRating[title];
    }

    return(
        <Card>
            <CardContent>
                <Typography variant="subtitle2" fontWeight="bold" className="cardHeader">
                    {title}
                </Typography>
                <CardActionArea onClick={handleOnClick}>
                    <Box display="flex" justifyContent="center" height="200px" py={2}>
                        <img 
                            id={title} 
                            src={require(`../../Assets/Logo/${img}`)} 
                            alt="logo" 
                        />
                    </Box>
                </CardActionArea>
                <Autocomplete 
                    disableClearable
                    fullWidth
                    defaultValue={() => getDefaultValue()}
                    options={_.map(_.range(9), (score) => ({
                                label: String(score + 1), 
                                value: String(score + 1),
                                key: String(score + 1)
                            }))}
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Rate"
                            name="rating"                            
                        />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={handleChange}
                >     
                </Autocomplete>
            </CardContent>        
        </Card>
    )
}

export default ItemCard;