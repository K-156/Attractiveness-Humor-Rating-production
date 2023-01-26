import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import _ from "lodash";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

import "./TemplateCard.css";

const TemplateCard = ({
  title,
  subheader,
  imageList,
  imagePath,
  handleExpandImage,
}) => {
  let pos = 0;
  const handleScroll = (event) => {
    const direction = event.target.id;
    const element = document.getElementById(`${title}-scrollable`);
    const maxWidth = element.scrollWidth - element.clientWidth;

    // get current scroll position (in case touchpad scroll is used)
    pos = element.scrollLeft;
    if (direction === "scroll-right") {
      pos = pos + 150 >= maxWidth ? maxWidth : pos + 150;
    } else {
      pos = pos - 150 <= 0 ? 0 : pos - 150;
    }
    element.scrollTo(pos, 0);
  };

  return (
    <Card sx={{ my: 2 }}>
      <CardHeader
        title={title}
        subheader={subheader}
        sx={{ pb: 0 }}
        titleTypographyProps={{ className: "summaryHeader" }}
        subheaderTypographyProps={{
          sx: {
            color: "#000507",
            fontSize: "14px",
          },
        }}
      />
      <CardContent sx={{ "&.MuiCardContent-root:last-child": { pb: "16px" } }}>
        <Grid container>
          <Grid item xs={0.5}>
            <Button
              id="scroll-left"
              sx={{ minWidth: "40px", height: "200px", color: "#264653" }}
              onClick={handleScroll}
            >
              <HiArrowLeft style={{ pointerEvents: "none" }} />
            </Button>
          </Grid>
          <Grid
            item
            xs={11}
            className="scrollableBox"
            id={`${title}-scrollable`}
          >
            {_.map(imageList, (image, index) => {
              return (
                <CardActionArea
                  key={image}
                  sx={{ width: "fit-content", mr: "10px" }}
                  onClick={handleExpandImage}
                >
                  <img
                    src={require(`../../Assets/${imagePath}/${image}.png`)}
                    name={title}
                    style={{ height: "200px" }}
                    alt={index}
                  />
                </CardActionArea>
              );
            })}
          </Grid>
          <Grid item xs={0.5}>
            <Button
              id="scroll-right"
              sx={{ minWidth: "40px", height: "200px", color: "#264653" }}
              onClick={handleScroll}
            >
              <HiArrowRight style={{ pointerEvents: "none" }} />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
