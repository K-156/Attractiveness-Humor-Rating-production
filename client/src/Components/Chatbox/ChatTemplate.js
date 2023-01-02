import { useAppContext } from "../../Context/AppContext";

import { Box, Card, CardContent } from "@mui/material";

import ChatHeader from "./ChatHeader";
import ChatMessageArea from "./ChatMessageArea";
import Messages from "./Messages";
import MessageSelected from "./MessageSelected";
import { colorPalette } from "../../Utils/colorPalette";
import ProfileInfo from "./ProfileInfo";

const ChatTemplate = ({
  selectMessage,
  setSelectMessage,
  link,
  firstCandidate,
  lastCandidate,
}) => {
  const { theme } = useAppContext();

  const receiver = link.includes("q2") ? "candidate 1" : "candidate 2";

  return (
    <Card sx={{ mx: 5, display: "flex" }}>
      <ProfileInfo
        receiver={receiver}
        firstCandidate={firstCandidate}
        lastCandidate={lastCandidate}
      />
      <Box sx={{ width: "100%" }}>
        <ChatHeader
          receiver={receiver}
          firstCandidate={firstCandidate}
          lastCandidate={lastCandidate}
        />
        <Box sx={{ display: "flex", height: "350px" }}>
          <CardContent>
            {selectMessage === null ? (
              <Messages
                setSelectMessage={setSelectMessage}
                theme={colorPalette[theme]["primary"]}
                themeHover={colorPalette[theme]["primaryLight"]}
              />
            ) : (
              <MessageSelected
                selectMessage={selectMessage}
                theme={colorPalette[theme]["primary"]}
              />
            )}
          </CardContent>
        </Box>
        <CardContent sx={{ borderTop: "1.5px solid #D9D9D9" }}>
          <ChatMessageArea theme={colorPalette[theme]["primary"]} />
        </CardContent>
      </Box>
    </Card>
  );
};

export default ChatTemplate;
