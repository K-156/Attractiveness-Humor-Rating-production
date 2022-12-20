import { Box, Button } from "@mui/material";
import _ from "lodash";

import "./Chatbox.css";

// const msg = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est", "omo", "jinjja"]

const Messages = ({ setSelectMessage, theme, themeHover }) => {

    const data = JSON.parse(localStorage.getItem("data"));

    return(
        <Box 
            id="MessageOptions" 
            sx={{height:"120px"}}
        >
            {_.map(data.messageOptions, (text) => {
                    return(
                        <Button
                            key={text}
                            id={text}
                            variant="outlined"
                            sx={{
                                color: theme, 
                                borderColor: theme, 
                                my: 0.5, 
                                mx: 2, 
                                textTransform: "none", 
                                "&:hover": {
                                    backgroundColor: themeHover, 
                                    borderColor: theme
                                }}}
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