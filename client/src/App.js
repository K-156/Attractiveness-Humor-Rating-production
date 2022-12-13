
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import "./index.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profiles from "./Pages/Attractive/Profiles";
import AudioRate from "./Pages/Audio/AudioRate";
import Description from "./Pages/Attractive/Description";
import Complete from "./Pages/Complete/Complete";
import Overview from "./Pages/Overview/Overview";
import DashboardLayout from "./Layout/DashboardLayout";
import SurveyLayout from "./Layout/SurveyLayout";
import Details from "./Pages/Details/Details";
import AttractiveRate from "./Pages/Attractive/AttractiveRate";
import Rank from "./Pages/Attractive/Rank";
// import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import Chat from "./Pages/Chat/Chat";
import AllProjects from "./Pages/Project/AllProjects";
import InstructionPage from "./Pages/InstructionPage/InstructionPage";


function App() {

  return (
    <div id="app">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details" element={<Details />} />

          {/* Survey */}
          <Route element={<SurveyLayout />}>
            <Route path="/attractive-instruction" element={<InstructionPage key="attractive" type="attractive" link="attractive/profile"/>} />
            <Route path="/attractive/profile" element={<Profiles />} />
            <Route path="/attractive/profile/:id" element={<Description />} />
            <Route path="/attractive/rate" element={<AttractiveRate />} />
            <Route path="/rank-instruction" element={<InstructionPage key="rank" type="rank" link="rank"/>} />
              <Route path="/rank" element={<Rank />} />
            <Route path="/audio-instruction" element={<InstructionPage key="audio" type="audio" link="audio/q1"/>} />
              <Route
                path="/audio/q1"
                element={<AudioRate key="audioQ1" title="1" link="audio/q2" isWritten={false} /> }
              />
              <Route
                path="/audio/q2"
                element={ <AudioRate key="audioQ2" title="2" link="chat-instruction" isWritten={false} /> }
              />
            <Route path="/intro-instruction" element={<InstructionPage key="intro" type="intro" link="intro/q1"/>} />
              <Route
                path="/intro/q1"
                element={ <AudioRate key="writtenQ1" title="1" link="intro/q2" isWritten={true} /> }
              />
              <Route
                path="/intro/q2"
                element={ <AudioRate key="writtenQ2" title="2" link="chat-instruction" isWritten={true} /> }
              />
            <Route path="/chat-instruction" element={<InstructionPage key="chat" type="prewritten" link="chat/q1"/>} />
              <Route path="/chat/q1" element={<Chat key="chatQ1" title="1" link="chat/q2"/> }/>
              <Route path="/chat/q2" element={<Chat key="chatQ2" title="2" link="complete" />}/>
          </Route>
          <Route path="/complete" element={<Complete />} />

          {/* Admin */}
          <Route element={<DashboardLayout />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/allprojects" element={<AllProjects />} />





          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
