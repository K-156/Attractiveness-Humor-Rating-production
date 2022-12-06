import { Box, Card, CardContent, Typography, TextField, Autocomplete, MenuItem } from "@mui/material";
import _ from "lodash";

import "./ItemCard.css";

const ItemCard = ({ title, img }) => {
    return(
        <Card>
            <CardContent>
                <Typography variant="subtitle2" fontWeight="bold" className="cardHeader">
                    {title}
                </Typography>
                <Autocomplete 
                    fullWidth
                    options={_.map(_.range(9), (score) => ({
                                label: score + 1, 
                                value: score + 1,
                                key: score + 1
                            }))}
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Rate"
                            name="rating"
                        />
                    )}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                >     
                </Autocomplete>
            </CardContent>        
        </Card>
    )
}

export default ItemCard;