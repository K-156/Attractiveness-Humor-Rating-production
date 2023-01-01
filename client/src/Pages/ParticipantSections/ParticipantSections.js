import { useAppContext } from "../../Context/AppContext";
import { useLocation } from "react-router-dom";

import InstructionPage from "../InstructionPage/InstructionPage";
import AttractiveRate from "../Attractive/AttractiveRate";
import General from "../General/General";
import NextButton from "../../Components/NavButton/NextButton";

import { Box } from "@mui/material";

const ParticipantSections = () => {
  const { sections } = useAppContext();

  const { data } = JSON.parse(localStorage.getItem("data"));

  const location = useLocation();
  const sectionNum = parseInt(location.pathname.split("/").pop());
  const currTemplate = sections[sectionNum - 1];

  return (
    <div>
      <script></script>
      {currTemplate === 1 ? (
        <InstructionPage key="attractive" type="attractive" link="/profiles" />
      ) : currTemplate === 2 ? (
        <AttractiveRate />
      ) : currTemplate === 3 ? (
        <InstructionPage key="rank" type="rank" link="/rank" />
      ) : currTemplate === 4 ? (
        <InstructionPage key="audio" type="audio" link="/audio/q1" />
      ) : currTemplate === 5 ? (
        <InstructionPage key="intro" type="intro" link="/intro/q1" />
      ) : currTemplate === 6 ? (
        <InstructionPage key="chat" type="prewritten" link="/chat/q1" />
      ) : (
        <General />
      )}
      <Box className="flexEnd" sx={{ py: 3, width: "80%"}}>
        <NextButton isSurvey={true} link={`/sections/${sectionNum + 1}`} />
      </Box>
    </div>
  );
};

export default ParticipantSections;
