import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, Typography } from "@mui/material";
import { BsFillGearFill } from "react-icons/bs"

import NextButton from '../../Components/NavButton/NextButton';
import { ReactComponent as LandingPage } from "../../Assets/landing-page.svg";
import "./Home.css";

const title="Job Application App";
const description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eveniet cupiditate facere suscipit voluptatibus neque," +
                "exercitationem similique quasi velit in itaque voluptatum distinctio inventore, ut nisi odit dolorem aliquam laborum.";

const Home = () => {
    
    const navigate = useNavigate();

    return(
        <div>
            <script>
                {document.title="Welcome"}
            </script>
            
            <Box display="flex" justifyContent="flex-end" mb={5}>
                <Button onClick={()=>navigate("/login")}>
                    <BsFillGearFill size="25px" color="#A3A3A3"/>
                </Button>
            </Box>
            <Grid container className="center" gap={2}>
                <Grid item xs={5} px={4}> 
                    <Typography variant="h5" sx={{fontWeight:"bold", color:"#C59D5F"}}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{my: 3}}>{description}</Typography>
                    <NextButton 
                        text="Start" 
                        link="attractive"
                    />
                </Grid>
                <Grid item xs={5} px={4}>
                    <LandingPage width="100%" height="0%"/>
                </Grid>

            </Grid>
            
        </div>
    )
}
export default Home;