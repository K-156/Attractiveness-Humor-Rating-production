import { useNavigate } from 'react-router-dom';

import { Box, Button } from "@mui/material";
import { HiArrowRight } from "react-icons/hi";

import "./NavButton.css";

const NextButton = ({ link, state, text, style }) => {

    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(`/${link}`, {
            state: {state}
        })
    }
        
    return (
        <Box sx={style}>
            <Button 
                onClick={handleOnClick}
                variant="contained" 
                sx={{background: "#264653"}}
            >
                {text === undefined ? "Next" : text} <HiArrowRight style={{marginLeft:"10px"}} />
            </Button>
        </Box>
    )
}

export default NextButton;