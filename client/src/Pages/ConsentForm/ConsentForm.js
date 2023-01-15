import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";

import { colorPalette } from "../../Utils/colorPalette";

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in" +
  "voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit" +
  "anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae" +
  "ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit," +
  "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur," +
  "adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum" +
  "exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit" +
  "esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" +
  "adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum" +
  "exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit" +
  "esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";

const ConsentForm = () => {
  const navigate = useNavigate();
  const { theme } = useAppContext();

  return (
    <div className={`backgroundImage-${theme} center`}>
      <script>{(document.title = "Consent Form")}</script>
      <Card sx={{ width: "80%" }}>
        <CardContent className="flexColumn center">
          <Typography
            variant="h5"
            className="formCardHeader"
            sx={{ color: colorPalette[theme]["primary"] }}
          >
            Consent Form
          </Typography>
          <Box sx={{ height: "250px", overflow: "auto", px: 3 }}>
            <Typography sx={{ fontSize: "14px" }}>{text}</Typography>
          </Box>
          <Box className="center" sx={{ mt: 3 }}>
            <Button
              sx={{
                textTransform: "none",
                color: colorPalette[theme]["primary"],
                mr: 5,
              }}
              onClick={() => navigate("/")}
            >
              <BsArrowLeft style={{ marginRight: "10px" }} />
              Back to Home
            </Button>
            <Button
              variant="contained"
              className={`customButton-${theme}`}
              onClick={() => navigate("/details")}
            >
              I agree
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentForm;
