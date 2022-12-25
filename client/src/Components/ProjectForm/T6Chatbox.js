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

import "./ProjectForm.css";
import AddableNoRange from "../CustomFormFields/AddableNoRange";

const T6Chatbox = () => {

    const [formData, setFormData] = useState({
        instruction: "",
        messages: [], 
    });
    const [error, setError] = useState({
        messages: false, 
    });

    const [messages, setMessages] = useState({});

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "instruction") {
            setFormData((state) => ({
                ...state, 
                instruction: value
            }));
        } else {
            setMessages(value);
            setError({
                messages: false
            });
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
                        <AddableNoRange
                            items={formData["messages"]}
                            error={error["messages"]}
                            setError={setError}
                            errorText="Message added"
                            handleOnChange={handleOnChange}
                            currValue={messages}
                            setFormData={setFormData}
                            variable="messages"                        
                        />
                    </Box>
                </Box>
        </FormControl>
        </CardContent>
    </Card>
    )
}

export default T6Chatbox;