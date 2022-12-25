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

const T5Intro = () => {

    const [formData, setFormData] = useState({
        instruction: "",
        questions: [], 
        introductions: []
    });
    const [error, setError] = useState({
        questions: false, 
        introductions: false
    });

    const [qn, setQn] = useState({});
    const [intro, setIntro] = useState({});

    const [currValue, setCurrValue] = useState({
        questions: {}, 
        introductions: {}
    });

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const id = event.target.id;

        if (name === "instruction") {
            setFormData((state) => ({
                ...state, 
                instruction: value
            }))
        } else if (id === "questions") {
            setQn((state) => ({
                ...state, 
                [name]: value
            }))
        } else {
            setIntro((state) => ({
                ...state, 
                [name]: value
            }))
        }

        if ( name === "questions" || name === "introductions") {
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
                            currValue={qn}
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
                            currValue={intro}
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

export default T5Intro;