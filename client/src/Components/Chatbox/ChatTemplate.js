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
import { ColorPalette } from "../../Utils/ColorPalette";


const ChatTemplate = ({ selectMessage, setSelectMessage, link}) => {

    const { theme } = useAppContext();
    
    const receiver = link.includes("q2") ? "candidate 1":"candidate 2";

    return (
        <Card sx={{mx: 5}}>
            <CardHeader
                sx={{
                    backgroundColor: ColorPalette[theme]["primary"], 
                    color:"#FFFFFF"
                }}
                title={ <ChatHeader receiver={receiver} /> }
            />
            <CardContent>
                <Box height="200px"></Box>
                { selectMessage === null 
                    ? <Messages 
                        setSelectMessage={setSelectMessage}
                        theme={ColorPalette[theme]["primary"]}
                        themeHover={ColorPalette[theme]["primaryLight"]}
                        /> 
                    : <MessageSelected 
                        selectMessage={selectMessage}
                        theme={ColorPalette[theme]["primary"]}
                        />
                }
            </CardContent>
            <CardContent sx={{borderTop: "1.5px solid #D9D9D9"}}>
                <ChatMessageArea 
                    theme={ColorPalette[theme]["primary"]}
                />
            </CardContent>
        </Card>
    )
}

export default ChatTemplate;