import { Box, Card, CardContent, Typography } from "@mui/material";

const Instruction = ({text}) => {
    return(
        <Card sx={{background: "#264653", color:"#FFFFFF", mx: 10, width:"80%" }}>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    <Typography variant="subtitle1" fontWeight="bold">Instruction</Typography>
                </Box>
                <Box 
                    display="flex" 
                    justifyContent="center" 
                    textAlign="center"
                    pt={1.5}
                    // px={1}
                >
                    <Typography variant="subtitle2">{text}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Instruction;