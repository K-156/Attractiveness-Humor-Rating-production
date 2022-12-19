import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import { Box, Card, CardContent, FormControl, TextField, Typography, } from "@mui/material";
import AddableField from "../CustomFormFields/AddableField";
import UploadFiles from "../CustomFormFields/UploadFiles";
import "./ProjectForm.css";

const T3Audio = () => {

    const [formData, setFormData] = useState({
        instruction: "",
        questions: [], 
        audio: []
    });
    const [error, setError] = useState({questions: false});
    const [qn, setQn] = useState();

    const { submitFormData } = useAppContext();

    useEffect(() => {
      submitFormData(formData);
    }, [formData]);

    return(
        <Card>
            <CardContent sx={{p:2, pl: 10}}>
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
                            handleOnChange={(event) => {setQn(event.target.value)}}
                            currValue={qn}
                            setFormData={setFormData}
                            variable="questions"                        
                        />
                    </Box>
            </Box>
            <Box className="twoColumns">
                <Box>
                    <Typography className="variable">Upload Audio<br/></Typography>
                    <Typography variant="subtitle2" className="variable"><i>(in .mp3)</i></Typography>
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

export default T3Audio;