import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import { 
    Box,
    Card, 
    CardContent, 
    FormControl,
    TextField, 
    Typography, 
} from "@mui/material";

import AddableField from "../CustomFormFields/AddableField";
import "./ProjectForm.css";

const T4Intro = () => {

    const [formData, setFormData] = useState({
        instruction: "",
        questions: [], 
        introductions: []
    });
    const [error, setError] = useState({
        questions: false, 
        introductions: false
    });

    const [currValue, setCurrValue] = useState({
        questions:"", 
        introductions: ""
    });

    console.log(currValue)

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name)

        if (name === "instruction") {
            setFormData((state) => ({
                ...state, 
                instruction: value
            }))
        } else {
            setCurrValue((state) => ({
                ...state, 
                [name]: value
            }))
            setError((state) => ({
                ...state, 
                [name]: false
            }))
        }
    }

    const { submitFormData } = useAppContext();

    useEffect(() => {
      submitFormData(formData);
    }, [formData]);

    return(
        <Card>
            <CardContent className="cardPadding">
            <FormControl>
                <Box className="twoColumns">
                    <Typography className="variable">Instruction</Typography>
                    <Box className="secondColumn">
                        <TextField
                            size="small" 
                            name="instruction"
                            fullWidth
                            multiline
                            minRows={3}
                            onChange={handleOnChange}
                        />
                    </Box>
                </Box>
                <Box className="twoColumns">
                    <Typography className="variable">Questions</Typography>
                    <Box className="secondColumn">
                        <AddableField
                            name="questions"
                            items={formData["questions"]}
                            error={error["questions"]}
                            setError={setError}
                            errorText="Question added"
                            handleOnChange={handleOnChange}
                            currValue={currValue["questions"]}
                            setFormData={setFormData}
                            variable="questions"                      
                        />
                    </Box>
                </Box>
            <Box className="twoColumns">
                <Box>
                    <Typography className="variable">Introductions</Typography>
                </Box>
                <Box className="secondColumn">
                        <AddableField
                            items={formData["introductions"]}
                            error={error["introductions"]}
                            setError={setError}
                            errorText="Introduction added"
                            handleOnChange={handleOnChange}
                            currValue={currValue["introductions"]}
                            setFormData={setFormData}
                            variable="introductions"                        
                        />
                </Box>
            </Box>
        </FormControl>
        </CardContent>
    </Card>
    )
}

export default T4Intro;