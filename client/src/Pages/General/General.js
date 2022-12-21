import { useAppContext } from "../../Context/AppContext";
import { useEffect } from "react";

import { 
    Box, 
    Card, 
    CardContent, 
    Typography
} from "@mui/material";

import { colorPalette } from "../../Utils/colorPalette";

const text = "Thank you for completing the survey.\nYour responses have been submitted.\n\nHave a nice day!"

const General = () => {

    const {removeUserFromLocalStorage, theme } = useAppContext();

    useEffect(() => {
        removeUserFromLocalStorage()
    },[])
    sessionStorage.clear();

    return (
    <div 
        className={`backgroundImage-${theme}`}
        style={{backgroundColor: colorPalette[theme]["background"]}}
    >
        <script>
            {document.title="Thank you"}
        </script>
        <Box className="center">
            <img
                src={require(`../../Assets/Theme/${theme}/general.svg`)}
                style={{
                    width: "20%",
                    height: "100%",
                    margin: "50px 20px 20px 20px"
                }}
            />
        </Box>       
        <Box className="center">
            <Card 
                sx={{
                    background: colorPalette[theme]["primary"], 
                    color:"#FFFFFF", 
                    minWidth:"500px",
                }} 
            >
                <CardContent sx={{p:"24px"}}>
                    <Typography
                        className="textCenter"
                        sx={{whiteSpace:"pre-line"}}
                    >
                        {text}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    </div>
    )
}

export default General;