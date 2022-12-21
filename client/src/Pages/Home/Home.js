import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';

import { Box, Button, Grid, Typography } from "@mui/material";
import { BsFillGearFill } from "react-icons/bs";
import _ from 'lodash';

import LandingPage from "../../Assets/landing-page_v2.svg";
import { colorPalette } from '../../Utils/colorPalette';

const title="Job Application";
const description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eveniet cupiditate facere suscipit voluptatibus neque," +
                "exercitationem similique quasi velit in itaque voluptatum distinctio inventore, ut nisi odit dolorem aliquam laborum.";
const roleList=["Employer", "Job seeker"]

const Home = () => {
    
    const { theme } = useAppContext();
    const navigate = useNavigate();
    const handleOnClick = (event) => {
        sessionStorage.setItem("role", (event.target.id).toLowerCase())
        navigate(`/login`)
    }

    return(
        <div className={`backgroundImage-${theme}`}>
            <script>{document.title="Welcome"}</script>
            
            <Box 
                className="flexEnd" 
                sx={{mb: 5}}
            >
                <Button onClick={()=>navigate("/login")}>
                    <BsFillGearFill 
                        size="25px" 
                        style={{color:"#A3A3A3"}}
                    />
                </Button>
            </Box>
            <Grid container className="centerPadding" gap={2}>
                <Grid item xs={4.5} px={4}> 
                    <Typography 
                        variant="h5" 
                        sx={{
                            fontWeight:"bold", 
                            color: colorPalette[theme]["secondary"]
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography 
                        sx={{
                            fontSize:"14px", 
                            my: 3
                        }}
                    >
                        {description}
                    </Typography>
                    <Grid container gap={1} > 
                        <Grid 
                            item xs={12} 
                            className="center" 
                            sx={{my:1}}
                        >
                            <Typography 
                                sx={{
                                    fontWeight:"bold", 
                                    color: colorPalette[theme]["secondary"], 
                                }}
                            >
                                I am an/a...
                            </Typography>
                        </Grid>
                        {_.map(roleList, (role) => {
                            return(
                            <Grid item xs={5.5} className="center" key={role}>
                                <Button
                                    id={role}
                                    onClick={handleOnClick}
                                    variant="contained" 
                                    className={`customButton-${theme}`}
                                >
                                    {role}
                                </Button>
                            </Grid>
                            ) 
                        })}   
                    </Grid>
                </Grid>
                <Grid item xs={5.5}>
                    <img 
                        src={LandingPage}
                        style={{
                            width: "100%",
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
export default Home;