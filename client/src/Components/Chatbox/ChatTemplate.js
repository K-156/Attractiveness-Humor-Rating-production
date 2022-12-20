import { useAppContext } from "../../Context/AppContext";

import { 
    Box, 
    Card, 
    CardContent, 
    CardHeader 
} from "@mui/material";

import ChatHeader from "./ChatHeader";
import ChatMessageArea from "./ChatMessageArea";
import Messages from "./Messages";
import MessageSelected from "./MessageSelected";
import { colorPalette } from "../../Utils/colorPalette";


const ChatTemplate = ({ selectMessage, setSelectMessage, link}) => {

    const { theme } = useAppContext();
    
    const receiver = link.includes("q2") ? "candidate 1":"candidate 2";

    return (
        <Card sx={{mx: 5}}>
            <CardHeader
                sx={{
                    backgroundColor: colorPalette[theme]["primary"], 
                    color:"#FFFFFF"
                }}
                title={ <ChatHeader receiver={receiver} /> }
            />
            <CardContent>
                <Box height="200px"></Box>
                { selectMessage === null 
                    ? <Messages 
                        setSelectMessage={setSelectMessage}
                        theme={colorPalette[theme]["primary"]}
                        themeHover={colorPalette[theme]["primaryLight"]}
                        /> 
                    : <MessageSelected 
                        selectMessage={selectMessage}
                        theme={colorPalette[theme]["primary"]}
                        />
                }
            </CardContent>
            <CardContent sx={{borderTop: "1.5px solid #D9D9D9"}}>
                <ChatMessageArea 
                    theme={colorPalette[theme]["primary"]}
                />
            </CardContent>
        </Card>
    )
}

export default ChatTemplate;