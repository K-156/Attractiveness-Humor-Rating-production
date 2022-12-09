import { useNavigate } from 'react-router-dom';

import { Box, Button } from "@mui/material";
import { HiArrowRight } from "react-icons/hi";

import "./NavButton.css";

const NextButton = ({ link, state, text, style, disabled, 
                     storeItem, ratingType, setIsSubmit, isSubmit, isValid }) => {


    const navigate = useNavigate();
    const handleOnClick = () => {

        if (setIsSubmit === undefined || isValid ) {

            if (ratingType === "rank") {
                sessionStorage.setItem("rank", storeItem)
            }   

            navigate(`/${link}`, {
                state: {state}
            })
        }

        if (isSubmit === false) {
            setIsSubmit(true)
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