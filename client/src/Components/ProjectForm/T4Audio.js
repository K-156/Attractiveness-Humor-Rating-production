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
import UploadFiles from "../CustomFormFields/UploadFiles";
import "./ProjectForm.css";

const T4Audio = () => {

    const [formData, setFormData] = useState({
        instruction: "",
        questions: [], 
        audio: []
    });
    const [error, setError] = useState({questions: false});
    const [qn, setQn] = useState({});
    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setQn((state) => ({
            ...state, 
            [name]: value
        }))
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
                            onChange={(event) => {
                                setFormData((state) => ({
                                    ...state, 
                                    instruction: event.target.value
                                }))
                            }}
                        />
                    </Box>
                </Box>
                <Box className="twoColumns">
                    <Typography className="variable">Questions</Typography>
                    <Box className="secondColumn">
                        <AddableField
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
                    <Typography className="variable">Upload Audio<br/></Typography>
                    <Typography className="variable-subtitle">(in .mp3)</Typography>
                </Box>
                <Box className="secondColumn">
                    <UploadFiles
                        items={formData["audio"]}
                        setFormData={setFormData}
                        variable="audio"
                        accept=".mp3"
                    />
                </Box>
            </Box>
        </FormControl>
        </CardContent>
    </Card>
    )
}

export default T4Audio;