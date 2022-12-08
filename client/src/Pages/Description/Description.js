import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PrevButton from "../../Components/NavButton/PrevButton";

const itemName = {
            "DBS Bank Private": "DBS logo.png", 
            "SeaMoney": "SeaMoney logo.png", 
            "SMU Institute of Service Excellence": "SMU ISE logo.jpg", 
            "Integrated Health Information System": "IHIS logo.png" 
        }    

const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem magnam sequi est. " +
            "Consectetur voluptates suscipit officia ipsa rerum, distinctio et minus quas beatae iusto? " +
            "Perspiciatis commodi nostrum eum facere beatae atque culpa sit iusto quod accusantium " +
            "laboriosam porro praesentium nobis quam dolorem possimus delectus voluptatibus dicta esse," +
            " minima unde architecto."

const Description = () => {

    const location = useLocation();
    const { id } = location.state;

    return(
        <>
        <script>
            {document.title="Description"}
        </script>

        <Box>
            <PrevButton link="attractive"/>
        </Box>
        
        <Container>
            <Box display="flex" justifyContent="center" height="200px" py={2}>
                <img src={require(`../../Assets/Logo/${itemName[id]}`)} alt="logo" />
            </Box>
            <Box>
                <Typography variant="subtitle2" className="cardHeader" fontWeight="bold" height="100%" >
                    {id}
                </Typography>
            </Box>
            <Card sx={{mt: 2}}>
                <CardContent>
                    <Typography textAlign="center">{text}</Typography>
                </CardContent>
            </Card>
        </Container>        
        </>
    )
}

export default Description;