import { useAppContext } from "../../Context/AppContext";
import { useLocation } from "react-router-dom";

import InstructionPage from "../InstructionPage/InstructionPage";
import AttractiveRate from "../Attractive/AttractiveRate";
import General from "../General/General";

const ParticipantSections = () => {
  const { formData, sections, isEditing } = useAppContext();

  const location = useLocation();
  const sectionNum = parseInt(location.pathname.split("/").pop());

  const currTemplate = 0;

  return (
    <div>
      <script>
        {
          (document.title = `${
            type === "add" ? "Add " : "Edit "
          } Project | Section ${sectionNum}`)
        }
      </script>

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
    </div>
  );
};

export default ParticipantSections;
