import { useState } from "react";

import { Box, Card, CardContent, CardHeader } from "@mui/material";

import ChatHeader from "./ChatHeader";
import ChatMessageArea from "./ChatMessageArea";
import Messages from "./Messages";
import MessageSelected from "./MessageSelected";


const receiver = "candidate 1";

const ChatTemplate = ({selectMessage, setSelectMessage}) => {

    return (
        <Card sx={{mx: 5}}>
            <CardHeader
                sx={{backgroundColor: "#264653", color:"#FFFFFF"}}
                title={<ChatHeader receiver={receiver}/>}
            />
            <CardContent>
                <Box height="200px"></Box>
                { selectMessage === null ? <Messages setSelectMessage={setSelectMessage}/> 
                    : <MessageSelected selectMessage={selectMessage}/>
                }
            </CardContent>
            <CardContent sx={{borderTop: "1.5px solid #D9D9D9"}}>
                <ChatMessageArea />
            </CardContent>
        </Card>
    )
}

export default ChatTemplate;