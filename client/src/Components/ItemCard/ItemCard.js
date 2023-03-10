import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import "./ItemCard.css";
import { themePalette } from "../../Utils/themePalette";

const ItemCard = ({ title, img, id, candidateCount, description, link }) => {
  const { theme } = useAppContext();
  const navigate = useNavigate();
  const handleOnClick = (event) => {
    navigate(`/profiles/${parseInt(event.target.id) + 1}`, {
      state: {
        id: `${event.target.id}`,
        candidateCount: { candidateCount },
        link: link,
      },
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography
          className="cardHeader"
          sx={{ color: themePalette[theme]["primary"] }}
        >
          {title}
        </Typography>
        <Box className="imageBox">
          <img id={title} src={img} alt="profile" />
        </Box>
        <Typography className="cardContent">{description}</Typography>
        <Box className="center">
          <Button
            variant="contained"
            onClick={handleOnClick}
            id={id}
            className={`customButton-${theme}`}
          >
            View Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
