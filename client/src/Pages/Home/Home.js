import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, Typography } from "@mui/material";
import { BsFillGearFill } from "react-icons/bs";
import _ from 'lodash';

import { ReactComponent as LandingPage } from "../../Assets/landing-page.svg";
import "./Home.css";

const title="Job Application";
const description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eveniet cupiditate facere suscipit voluptatibus neque," +
                "exercitationem similique quasi velit in itaque voluptatum distinctio inventore, ut nisi odit dolorem aliquam laborum.";
const roleList=["Employer", "Job seeker"]

const Home = () => {
    
    const navigate = useNavigate();
    const handleOnClick = (event) => {
        sessionStorage.setItem("role", (event.target.id).toLowerCase())
        navigate(`/login`)
    }

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
                    <Grid container gap={1} > 
                        <Grid item xs={12} display="flex" justifyContent="center" mb={1} mt={1}>
                            <Typography variant="subtitle2" sx={{fontWeight:"bold", color:"#C59D5F"}}>
                                I am an/a...
                            </Typography>
                        </Grid>
                        {_.map(roleList, (role) => {
                            return(
                            <Grid item xs={5.5} display="flex" justifyContent="center" key={role}>
                                <Button
                                    id={role}
                                    onClick={handleOnClick}
                                    variant="contained" 
                                    sx={{background: "#264653", '&:hover': {backgroundColor:"#C59D5F"}}}
                                >
                                    {role}
                                </Button>
                            </Grid>
                            ) 
                        })}   
                    </Grid>
                </Grid>
                <Grid item xs={5} px={4}>
                    <LandingPage width="100%" height="0%"/>
                </Grid>
            </Grid>
        </div>
    )
}
export default Home;