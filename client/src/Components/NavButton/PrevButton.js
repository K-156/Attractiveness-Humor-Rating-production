import { useNavigate } from 'react-router-dom';

import { Box, Button } from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";

import "./NavButton.css";

const PrevButton = ({ state, text, style, link }) => {

    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(`${link}`, {
            state: {state}
        })
    }
        
    return (
        <Box sx={style}>
            <Button 
                onClick={handleOnClick}
                variant="contained" 
                className="customButton"
            >
                <HiArrowLeft style={{marginRight:"10px"}} /> {text === undefined ? "Previous" : text} 
            </Button>
        </Box>
    )
}

export default PrevButton;