import { useAppContext } from "../../Context/AppContext";

import { Box, Card, CardContent, Typography } from "@mui/material";

import NextButton from "../../Components/NavButton/NextButton";
import { colorPalette } from "../../Utils/colorPalette";
import "./InstructionPage.css";

const InstructionPage = ({ type, link }) => {
  const { theme, sectionNum } = useAppContext();
  const { data } = JSON.parse(localStorage.getItem("data"));
  const role = sessionStorage.getItem("role");

  return (
    <div className={`backgroundImage-${theme} center`}>
      <script>{(document.title = "Instruction")}</script>
      <Box className="instruction">
        <Box className="center" sx={{ width: "30%", p: "30px" }}>
          <img
            src={require(`../../Assets/Theme/${theme}/instruction.svg`)}
            style={{ width: "100%" }}
            alt="instruction"
          />
        </Box>
        <Card
          sx={{
            background: colorPalette[theme]["primary"],
            color: "#FFFFFF",
            mx: 30,
            width: "80%",
          }}
        >
          <CardContent>
            <Box className="center">
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Instruction
              </Typography>
            </Box>
            <Box className="center" pt={1.5}>
              <Typography className="textCenter">
                {data[sectionNum][Object.keys(data[sectionNum])[0]][role].instruction}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Box className="flexEnd" sx={{ py: 3, width: "80%" }}>
          <NextButton isSurvey={true} link={link} />
        </Box>
      </Box>
    </div>
  );
};

export default InstructionPage;
