import { useState } from "react";

import { Box } from "@mui/material";

import ChatTemplate from "../../Components/Chatbox/ChatTemplate";
import NextButton from "../../Components/NavButton/NextButton";
import PrevButton from "../../Components/NavButton/PrevButton";
import Instruction from "../../Components/Instruction/Instruction";

const Chat = ({title, link}) => {

    const [selectMessage, setSelectMessage] = useState(null);

    return(
        <div>
            <Box ml={5} mb={2}>
            <Instruction type="prewritten"/>
            </Box>
            <ChatTemplate 
                selectMessage={selectMessage}
                setSelectMessage={setSelectMessage}
            />
            <Box display="flex" justifyContent="space-between" mx={5} my={3}>
                {parseInt(title) === 1 ?
                    <PrevButton link="chat-instruction" />
                    : <Box></Box>
                }
                <NextButton 
                    disabled={selectMessage===null}
                    link={link}
                />
            </Box>
            
        </div>
    )
}

export default Chat;