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


const ChatHeader = ({ receiver }) => {

  const { theme } = useAppContext();

  const {data} = JSON.parse(localStorage.getItem("data"));
  const user = JSON.parse(localStorage.getItem("user"));
  const firstCandidate = user.userResponse.rank[0];
  const lastCandidate =
    user.userResponse.rank[user.userResponse.rank.length - 1];

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
                  CANDIDATE 1
                  {/* {receiver.includes("1")
                      ? data.proj[firstCandidate].name.toUpperCase()
                      : data.proj[lastCandidate].name.toUpperCase()} */}
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
