import { useEffect } from "react";

import { Autocomplete, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import _ from "lodash";


const AudioForm = ({ setRating, data }) => {

    const ques = {
        "q1" : "How funny am I?", 
        "q2" : "Do I have a good sense of humor?", 
        "q3" : "How emotionally express am I?", 
        "q4" : "Would I be a warm person to others?", 
        "q5" : "How attracted are you to me?", 
    }

    const handleChange = (event) => {
        let qn = event.target.id;
        qn = qn.split("-")[0]
        setRating((state) => ({
            ...state, 
            [qn] : event.target.textContent
        }))
    }

    const audioRating = sessionStorage.getItem(data);
    useEffect(() => {
        if (audioRating !== null) {
            setRating(JSON.parse(audioRating))
        }
    }, []);
    const getDefaultValue = (key) => {
        if (audioRating === null) { 
            return "";
        } 
        const jsonRating = JSON.parse(audioRating)
        return jsonRating[key];
    }


    return(
        <Card>
            <CardContent>
                <Grid container gap={1}>
                    {_.map(ques, (value, key) => {
                        return(
                            <Grid container key={key} gap={3}>
                                <Grid item xs={7} display="flex" justifyContent="flex-end" alignItems="center">
                                    <Typography>{value}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Autocomplete 
                                        disableClearable
                                        fullWidth
                                        id={key}
                                        defaultValue={() => getDefaultValue(key)}
                                        options={_.map(_.range(9), (score) => ({
                                                    label: String(score + 1), 
                                                    value: String(score + 1),
                                                    key: String(score + 1),
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
                                    />                                 
                                </Grid>
                            </Grid> 
                        )
                    })
                    }
                    
                </Grid>
            </CardContent>
        </Card>
    )
}

export default AudioForm;