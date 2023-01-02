import { useAppContext } from "../../Context/AppContext";

import { 
  Box, 
  Typography, 
  CardHeader
} from "@mui/material";
import { RxMagnifyingGlass } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { colorPalette } from "../../Utils/colorPalette";


const ChatHeader = ({ receiver, firstCandidate, lastCandidate }) => {

  const { theme } = useAppContext();

  return (
    <Box sx={{display:"flex"}}>
      <CardHeader
          sx={{
              backgroundColor: colorPalette[theme]["primary"], 
              color:"#FFFFFF",
              width:"100%",
              py: "12px"
          }}
          title={ 
            <Box className="spaceBetween">
              <Box className="center">
                <Typography 
                  sx={{
                    fontSize: "14px", 
                    fontWeight: "bold", 
                    letterSpacing: 1
                  }}
                > 
                  {receiver.includes("1")
                      ? firstCandidate.optionName.toUpperCase()
                      : lastCandidate.optionName.toUpperCase()}
                </Typography>
              </Box>
              <Box className="center">
                <RxMagnifyingGlass style={{ marginRight: 3 }} />
                <BiDotsVerticalRounded />
              </Box>
            </Box>
          }
        />    
    </Box>
  );
};

export default ChatHeader;
