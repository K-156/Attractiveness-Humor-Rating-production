import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button , Card, CardContent, FormControl, FormGroup, MenuItem, TextField, Typography } from "@mui/material";
import _ from "lodash";


const Details = () => {
    
    const navigate = useNavigate();
    
    const detailList = ["Name", "Gender", "Age", "Occupation", "Race"]

    const [formData, setFormData] = useState({name: "", gender: "", age: "", occupation: "", race: ""});
    const [error, setError] = useState({name: false, gender: false, age: false, occupation: false, race: false})

    const handleOnChange = (event) => {
        setFormData((state) => ({
            ...state, 
            [event.target.name]: event.target.value
        }))
        setError((state) => ({
            ...state, 
            [event.target.name]: false
        }))
    }

    const handleOnSubmit = () => {
        let toSubmit = true
        _.map(Object.keys(formData), (key)=> {
            if (formData[key] === "") {
                setError((state) => ({...state, [key]: true}))
                toSubmit = false
            }
        })
        console.log(toSubmit)
        if (toSubmit) {
            navigate("/attractive")
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card sx={{px: 1, py: 2, mt: 4, width: "500px"}}>
                <CardContent sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <Typography 
                        variant="h5" 
                        sx={{letterSpacing:"2px", fontWeight:"bolder", color: "#264653", mb:3, mt: 1}}
                    >
                        Fill in your details
                    </Typography>
                    <FormControl sx={{width:"80%", my: 2}}>
                    <FormGroup>
                        
                        {_.map(detailList, (detail) => {
                            if (detail === "Gender") {
                                return(
                                    <TextField
                                        select    
                                        required
                                        key={detail}
                                        name="gender"
                                        label="Gender"
                                        value={formData.gender}
                                        onChange={handleOnChange}
                                        sx={{my:1}}
                                        error={error[detail.toLowerCase()]}
                                        helperText={error[detail.toLowerCase()] ? "Select your gender" : ""}
                                    >
                                        <MenuItem id="female" value="female">Female</MenuItem>
                                        <MenuItem id="male" value="male">Male</MenuItem>
                                    </TextField>     
                                )
                            }

                            return(
                                <TextField 
                                    required
                                    key={detail}
                                    name={detail.toLowerCase()}
                                    label={detail}
                                    type={detail==="Age" ? "number" : "text"}
                                    sx={{my:1}}
                                    onChange={handleOnChange}
                                    error={error[detail.toLowerCase()]}
                                    helperText={error[detail.toLowerCase()] ? `Enter your ${detail.toLowerCase()}` : ""}
                                /> 
                            )
                        })}
                        
                    </FormGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        sx={{background: "#264653", color:"#FFFFFF", '&:hover': {backgroundColor:"#C59D5F"}, width:"80%"}}
                        onClick={handleOnSubmit}
                    > 
                        Submit
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details;