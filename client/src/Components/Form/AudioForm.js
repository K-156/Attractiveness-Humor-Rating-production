import { useEffect, useState } from "react";

import { Box, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, 
        Radio, RadioGroup, TextField, Typography } from "@mui/material";
import _ from "lodash";


const AudioForm = ({ ques, setRating, rating, isSubmit, setIsSubmit }) => {

    const [error, setError] = useState({});
    const [listen, setListen] = useState(false);

    const handleOnChange = (event) => {
        const value = event.target.value
        setError((state) => ({
            ...state, 
            [event.target.id]: {
                isEmpty: false, 
                outsideRange: (value < 1 || value > 9) ? true : false
            }
        }))

        setRating((state) => ({
            ...state, 
            [event.target.id] : event.target.value
        }))
        setIsSubmit(false)
    }

    useEffect(()=> {
        _.map(ques, (value, key) => {
            setError((state)=> ({
                ...state,
                [key]: {isEmpty: false, outsideRange: false}
            }))
        })
    }, [])

    console.log(isSubmit)
    useEffect(() => {
        _.map(ques, (value, key) => {
            setError((state)=> ({
                ...state,
                [key]: {
                    isEmpty: isSubmit && (rating[key] === "" || rating[key] === undefined) ? true : false, 
                    outsideRange: false
                }
            }))
         })
    }, [isSubmit]) 

    return(
        <>
        { !listen ?
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="center">
                        <FormControl>
                            <FormLabel sx={{color:"#000000", fontSize:"14px"}}>I have finished listening to the recording</FormLabel>
                            <RadioGroup row sx={{justifyContent: "center"}}>
                                <FormControlLabel 
                                    value={true} 
                                    control={<Radio size="small"/>} 
                                    label="Yes" 
                                    labelPlacement="Start"
                                    sx={{".MuiFormControlLabel-label": {fontSize:"14px"}}}
                                    onChange={() => setListen(true)}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>
        
        :
            <>
            <Card sx={{background: "#264653", color:"#FFFFFF", mb:2}} >
                <Box display="flex" justifyContent="center" sx={{p:"10px"}}>
                    <Typography>1 - not very, 9 - extremely</Typography>
                </Box>
            </Card>
            <Card>
            <CardContent>
                <Grid container gap={1}>
                    {_.map(ques, (value, key) => {
                        return(
                            <Grid container key={key} gap={3}>
                                <Grid item xs={7} display="flex" justifyContent="flex-end" alignItems="center">
                                    <Typography variant="subtitle2">{value}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        id={key}
                                        label="Rate"
                                        type="number"
                                        InputProps={{ inputProps: { min: 1, max: 9} }}
                                        onChange={handleOnChange}
                                        error={error[key].isEmpty || error[key].outsideRange}
                                        helperText={error[key].isEmpty ? "Enter your rating" 
                                                    : error[key].outsideRange ? "Rating out of range" : ""}
                                    />
                                </FormControl>       
                                </Grid>
                            </Grid> 
                        )
                    })
                    }
                </Grid>  
            </CardContent>
            </Card> 
            </>      
        }
        </>
    )
}

export default AudioForm;