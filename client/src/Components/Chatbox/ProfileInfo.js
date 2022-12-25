import { useAppContext } from "../../Context/AppContext";

import { 
    Box, 
    Typography, 
    CardHeader
} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { colorPalette } from "../../Utils/colorPalette";

const description = "I am a year 4 student from SCIS. Major in SMT"

const ProfileInfo = () => {

    const { theme } = useAppContext();

    return(
        <Box sx={{width:"400px", borderRight:"solid 1px #D9D9D9"}}>
        <CardHeader
            sx={{
                backgroundColor: colorPalette[theme]["primary"], 
                color:"#FFFFFF",
                py: "12px"
            }}
            title={ 
            <Box sx={{display:"flex", alignItems:"center"}}>
                <RxCross2 style={{marginRight: "70px"}}/>
                <Typography sx={{fontWeight:"bold", fontSize:"14px"}}>
                    Profile Info
                </Typography>
            </Box>
            }
        /> 
        <Box sx={{p:2}}>
            <Box className="center">
                <img 
                    src={require("../../Assets/Candidates/Female 1.jpg")} 
                    style={{width:"200px"}}
                />
            </Box>
            <Typography 
                className="cardHeader"
                sx={{color: colorPalette[theme]["primary"]}}
            >
                Candidate 1
            </Typography>
            <Typography sx={{fontSize:"14px", textAlign:"center", pt:1}}>
                {description}
            </Typography>
        </Box>  
        </Box>
    )
}

export default ProfileInfo;