import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';

import { Box, Button } from "@mui/material";
import { HiArrowRight } from "react-icons/hi";

import "./NavButton.css";

const NextButton = ({ link, state, text, style, disabled, 
                     storeItem, ratingType, handleOnSubmit }) => {

    const { theme } = useAppContext();

    const navigate = useNavigate();
    const handleOnClick = () => {

        if (ratingType === "rank") {
            sessionStorage.setItem("rank", storeItem)
        }   

        navigate(`${link}`, {
            state: {state}
        })
    }

    return (
        <Box sx={style}>
            <Button 
                disabled={disabled}
                onClick={handleOnSubmit ? handleOnSubmit : handleOnClick}
                variant="contained" 
                className={`customButton-${theme}`}
            >
                {text === undefined ? "Next" : text} <HiArrowRight style={{marginLeft:"10px"}} />
            </Button>
        </Box>
    )
}

export default NextButton;