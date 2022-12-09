import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button , Card, CardContent, FormControl, FormGroup, MenuItem, TextField, Typography } from "@mui/material";
import _ from "lodash";


const Details = () => {
    
    const navigate = useNavigate();
    
    const detailList = ["Name", "Gender", "Age", "Occupation", "Race"]

    const [formData, setFormData] = useState({name: "", gender: "", age: "", occupation: "", race: ""});
    const [toSubmit, setToSubmit] = useState(false);
    const [ageError, setAgeError] = useState(false);

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "age" && parseInt(value) < 1) {
            setAgeError(true) 
            return
         } else { 
            setAgeError(false) 
        }

        setFormData((state) => ({
            ...state, 
            [name]: value
        }))

        if (!(Object.values(formData).includes(""))) {
            setToSubmit(true)
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center"}}>
            <script>
                {document.title="Personal Details"}
            </script>
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
                                    InputProps={{ inputProps: { min: 1 } }}
                                    onChange={handleOnChange}
                                    error={detail==="Age" ? ageError : false}
                                    helperText={detail==="Age" && ageError ? "Age must be at least 1" :""}
                                /> 
                            )
                        })}
                        
                    </FormGroup>
                    </FormControl>
                    <Button
                        disabled={!toSubmit}
                        type="submit"
                        variant="contained"
                        sx={{background: "#264653", '&:hover': {backgroundColor:"#C59D5F"}, width:"80%", mt:2}}
                        onClick={() => navigate("/attractive")}
                    > 
                        Submit
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Details;