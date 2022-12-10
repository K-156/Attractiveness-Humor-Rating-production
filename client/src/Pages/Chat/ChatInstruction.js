import { Box } from "@mui/material";

import Instruction from "../../Components/Instruction/Instruction";
import NextButton from "../../Components/NavButton/NextButton";
import { ReactComponent as ChatboxImage } from "../../Assets/chatbox.svg";

const instruction="Select ONE message that you would like to send to each candidate." +
                    "There will be TWO candidate"

const Chat = () => {
    return(
        <div style={{display:"flex",  flexDirection:"column", alignItems: "center"}} >
            <script>
                {document.title="Instruction"}
            </script>
            <ChatboxImage width="30%" height="0%" style={{margin: "20px"}}/>
            <Instruction text={instruction}/>
            <Box py={2} display="flex" justifyContent="flex-end" width="80%">
                <NextButton link="chat/q1"/>
            </Box>
        </div>
    )
}

export default Chat;