import { 
  Box, 
  Typography 
} from "@mui/material";
import { RxMagnifyingGlass } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";

const ChatHeader = ({ receiver }) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const user = JSON.parse(localStorage.getItem("user"));
  const firstCandidate = user.userResponse.rank[0];
  const lastCandidate =
    user.userResponse.rank[user.userResponse.rank.length - 1];

  return (
    <Box className="spaceBetween">
      <Box className="center">
        <img
          src={
            receiver.includes("1")
              ? data.proj[firstCandidate].img
              : data.proj[lastCandidate].img
          }
          alt="display"
          style={{ borderRadius: "20px", height: "30px", marginRight: "15px" }}
        />
        <Typography 
          sx={{
            fontSize: "14px", 
            fontWeight: "bold", 
            letterSpacing: 1
          }}
        >
          {receiver.includes("1")
              ? data.proj[firstCandidate].name.toUpperCase()
              : data.proj[lastCandidate].name.toUpperCase()}
        </Typography>
      </Box>
      <Box className="center">
        <RxMagnifyingGlass style={{ marginRight: 3 }} />
        <BiDotsVerticalRounded />
      </Box>
    </Box>
  );
};

export default ChatHeader;
