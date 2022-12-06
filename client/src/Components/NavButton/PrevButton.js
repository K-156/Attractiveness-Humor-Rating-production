import { useNavigate } from 'react-router-dom';

import { Box, Button } from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";

import "./NavButton.css";

const PrevButton = ({ state, text, style }) => {

    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(-1, {
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
                <HiArrowLeft style={{marginRight:"10px"}} /> {text === undefined ? "Previous" : text}
            </Button>
        </Box>
    )
}

export default PrevButton;