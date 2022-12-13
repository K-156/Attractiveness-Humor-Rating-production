import { Box, Button } from "@mui/material";
import _ from "lodash";

import "./Chatbox.css";

// const msg = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est", "omo", "jinjja"]

const Messages = ({ setSelectMessage }) => {

    const data = JSON.parse(localStorage.getItem("data"));

    return(
        <Box id="MessageOptions" height="120px">
            {_.map(data.messageOptions, (text) => {
                    return(
                        <Button
                            key={text}
                            id={text}
                            variant="outlined"
                            sx={{color: "#264653", borderColor: "#264653", my: 0.5, mx: 2, textTransform: "none", 
                                "&:hover": {backgroundColor: "rgba(38, 70, 83, 0.1)", borderColor: "#264653"}}}
                            onClick={(event) => setSelectMessage(event.target.id)}
                        >
                            {text}
                        </Button>
                    )
                    })
                }
        </Box>     
    )
}

export default Messages;