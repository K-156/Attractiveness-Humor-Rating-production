import { useNavigate } from 'react-router-dom';

import { Box, Button } from "@mui/material";
import { HiArrowRight } from "react-icons/hi";

import "./NavButton.css";

const NextButton = ({ link, state, text, style, disabled, 
                    rating, ratingType, setIsSubmit, isSubmit }) => {

    const navigate = useNavigate();
    const handleOnClick = () => {

        if (setIsSubmit === false) {
            setIsSubmit(true)
            return
        }

        if (ratingType === "attractive") {
            sessionStorage.setItem("attractive", rating)
        }
        
        if (setIsSubmit === undefined || isSubmit === true) {
            navigate(`/${link}`, {
                state: {state}
            })
        }
        
    }
        
    return (
        <Box sx={style}>
            <Button 
                disabled={disabled}
                onClick={handleOnClick}
                variant="contained" 
                sx={{background: "#264653", '&:hover': {backgroundColor:"#C59D5F"}}}
            >
                {text === undefined ? "Next" : text} <HiArrowRight style={{marginLeft:"10px"}} />
            </Button>
        </Box>
    )
}

export default NextButton;