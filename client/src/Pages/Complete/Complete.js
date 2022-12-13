import { Box, Card, CardContent, Typography} from "@mui/material";
import { ReactComponent as General } from "../../Assets/general.svg";

const Complete = () => {

    sessionStorage.clear();

    return (
    <div style={{display:"flex",  flexDirection:"column", alignItems: "center"}}>
        <script>
            {document.title="Thank you"}
        </script>
        <General width="20%" height="0%" style={{margin: "50px 20px 20px 20px"}}/>
        <Card sx={{background: "#264653", color:"#FFFFFF" }} >
            <CardContent>
                <Box 
                    display="flex" 
                    flexDirection="column"
                    justifyContent="center" 
                    textAlign="center"
                    pt={1.5}
                    px={20}
                >
                    <Typography variant="subtitle2">Thank you for completing the survey.</Typography>
                    <Typography variant="subtitle2">Your reponses have been submitted.</Typography>
                    <Typography variant="subtitle2" sx={{pt:2}}>Have a nice day!</Typography>
                </Box>
            </CardContent>
        </Card>
    </div>
    )
}

export default Complete;