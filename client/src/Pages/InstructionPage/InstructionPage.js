import { Box, Card, CardContent, Typography } from "@mui/material";

import NextButton from "../../Components/NavButton/NextButton";
import { ReactComponent as InstructionImage } from "../../Assets/instruction.svg";
import "./InstructionPage.css";

// const instruction = {
//     "attractive": "Based on the candidates’ profile, please rate the candidates between 1 to 9. (1 - extremely uninterested, 9 - extremely interested)", 
//     "rank": "Drag and drop the candidates to rank them, with the most interested candidate on the left.", 
//     "audio": "Two of the candidates that you have ranked as your first and last choice have uploaded their audio introduction. Please answer the questions by rating between 1 to 9. (1 - not very, 9 - extremely)",
//     "intro": "Two of the candidates that you have ranked as your first and last choice have written self-introductions. Please answer the questions by rating between 1 to 9. (1 - not very, 9 - extremely)",
//     "prewritten": "Select one message that you would like to send to your first and last choice candidate"
// }

const InstructionPage = ( { type, link } ) => {

    // sessionStorage.setItem(type, instruction[type])
    const data = JSON.parse(localStorage.getItem("data"));

    
    return(
        <div 
            className="backgroundImage" 
            style={{display:"flex",  flexDirection:"column", alignItems: "center"}} 
        >
            <script>
                {document.title="Instruction"}
            </script>
            <Box className="instruction">
                <InstructionImage width="20%" height="0%" style={{margin: "20px"}}/>
                <Card sx={{background: "#264653", color:"#FFFFFF", mx: 30, width:"80%" }}>
                    <CardContent>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="subtitle1" fontWeight="bold">Instruction</Typography>
                        </Box>
                        <Box 
                            display="flex" 
                            justifyContent="center" 
                            textAlign="center"
                            pt={1.5}
                        >
                            <Typography variant="subtitle2" sx={{whiteSpace:"pre-line"}}>{data[`${type}Instruc`]}</Typography>
                        </Box>
                    </CardContent>
                </Card>
                <Box py={2} display="flex" justifyContent="flex-end" width="80%">
                    <NextButton link={link}/>
                </Box>
            </Box>
            
        </div>
    )
}

export default InstructionPage;