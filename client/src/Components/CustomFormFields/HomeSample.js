import { 
    Box, 
    Button, 
    Grid, 
    Typography 
} from "@mui/material";
import { BsFillGearFill } from "react-icons/bs";
import _ from 'lodash';

import { colorPalette } from '../../Utils/colorPalette';
import "./HomeSample.css";

const HomeSample = ({ theme, title, description, roleList, graphic }) => {

    return(
        <div className={`sampleBackground-${theme}`}  >            
            <Box 
                className="flexEnd" 
                sx={{mb: 5, m: 1}}
            >
                <BsFillGearFill 
                    size="15px" 
                    style={{color:"#A3A3A3", marginTop:"10px"}}
                />
            </Box>
            <Grid container className="center" sx={{mt: 6, px:2}}>
                <Grid item xs={5} sx={{px: 1}}> 
                    <Typography 
                        sx={{
                            fontSize:"12px",
                            fontWeight:"bold", 
                            color: colorPalette[theme]["secondary"]
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography 
                        sx={{
                            fontSize:"7px", 
                            my: 1
                        }}
                    >
                        {description}
                    </Typography>
                    <Grid container gap={1} > 
                        <Grid 
                            item xs={12} 
                            className="center" 
                            sx={{my:0.5}}
                        >
                            <Typography 
                                sx={{
                                    fontSize:"8px",
                                    fontWeight:"bold", 
                                    color: colorPalette[theme]["secondary"], 
                                }}
                            >
                                I am an/a...
                            </Typography>
                        </Grid>
                        {_.map(roleList, (role) => {
                            return(
                            <Grid item xs={5} className="center" key={role}>
                                <Button
                                    id={role}
                                    variant="contained" 
                                    className={`customButton-${theme}`}
                                    sx={{fontSize:"7px"}}
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
                        src={graphic}
                        style={{ width: "100%" }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
export default HomeSample;