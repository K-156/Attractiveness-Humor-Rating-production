import { useAppContext } from "../../Context/AppContext";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { themePalette } from "../../Utils/themePalette";

const RankCard = ({ id, title, img, description }) => {
  const { theme } = useAppContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ maxWidth: "300px" }}
    >
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
        <Typography className="cardContent" sx={{ m: 1 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RankCard;
