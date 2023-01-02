import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import "./index.css";
import "./Theme.css";
import "./Format.css";
import DashboardLayout from "./Layout/DashboardLayout";
import SurveyLayout from "./Layout/SurveyLayout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profiles from "./Pages/Profiles/Profiles";
import AudioRate from "./Pages/Audio/AudioRate";
import Description from "./Pages/Profiles/Description";
import General from "./Pages/General/General";
import Overview from "./Pages/Overview/Overview";
import Details from "./Pages/Details/Details";
import AttractiveRate from "./Pages/Attractive/AttractiveRate";
import Rank from "./Pages/Rank/Rank";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import Chat from "./Pages/Chat/Chat";
import Projects from "./Pages/Project/Projects";
import InstructionPage from "./Pages/InstructionPage/InstructionPage";
import ProjectDetails from "./Pages/Project/ProjectDetails";
import ProjectSection from "./Pages/Project/ProjectSection";
import Section from "./Pages/Project/Section";
import Templates from "./Pages/Project/Templates";
import Summary from "./Pages/Project/Summary";
import GeneralLayout from "./Layout/GeneralLayout";
import Themes from "./Pages/Project/ThemeSamples";
import AdminLogin from "./Pages/Login/AdminLogin";
import Error404 from "./Pages/Error404/Error404";


function App() {

  return (
    <div id="app">
      <CssBaseline />
      <Router>
        <Routes>
          <Route element={<GeneralLayout />} >
            <Route path="/" element={<Home />}  />
            <Route path="*" element={<Error404 />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/login" element={<AdminLogin />} /> {/*to change to above code*/}
            <Route path="/alogin" element={<AdminLogin />} />
            <Route
              path="/details"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Survey */}
          <Route
            element={
              <ProtectedRoute>
                <SurveyLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/attractive-instruction"
              element={
                <InstructionPage
                  key="attractive"
                  type="attractive"
                  link="/profiles"
                />
              }
            />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profiles/:id" element={<Description />} />
            <Route path="/attractive/rate" element={<AttractiveRate />} />
            <Route
              path="/rank-instruction"
              element={<InstructionPage key="rank" type="rank" link="/rank" />}
            />
            <Route path="/rank" element={<Rank />} />
            <Route
              path="/audio-instruction"
              element={
                <InstructionPage key="audio" type="audio" link="/audio/q1" />
              }
            />
            <Route
              path="/audio/q1"
              element={
                <AudioRate
                  key="audioQ1"
                  title="1"
                  link="/audio/q2"
                  isWritten={false}
                />
              }
            />
            <Route
              path="/audio/q2"
              element={
                <AudioRate
                  key="audioQ2"
                  title="2"
                  link="/chat-instruction"
                  isWritten={false}
                />
              }
            />
            <Route
              path="/intro-instruction"
              element={
                <InstructionPage key="intro" type="intro" link="/intro/q1" />
              }
            />
            <Route
              path="/intro/q1"
              element={
                <AudioRate
                  key="writtenQ1"
                  title="1"
                  link="/intro/q2"
                  isWritten={true}
                />
              }
            />
            <Route
              path="/intro/q2"
              element={
                <AudioRate
                  key="writtenQ2"
                  title="2"
                  link="/chat-instruction"
                  isWritten={true}
                />
              }
            />
            <Route
              path="/chat-instruction"
              element={
                <InstructionPage key="chat" type="prewritten" link="/chat/q1" />
              }
            />
            <Route
              path="/chat/q1"
              element={<Chat key="chatQ1" title="1" link="/chat/q2" />}
            />
            <Route
              path="/chat/q2"
              element={<Chat key="chatQ2" title="2" link="/complete" />}
            />
          </Route>
          <Route path="/complete" element={<General />} />

          {/* Admin */}
          <Route element={<DashboardLayout />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/details" element={<ProjectDetails />} />
            <Route path="/projects/sections" element={<ProjectSection />} />
            <Route path="/projects/sections/:id" element={<Section />} />
            <Route path="/projects/samples/templates" element={<Templates />} />
            <Route path="/projects/samples/themes" element={<Themes />} />
            <Route path="/projects/summary" element={<Summary />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
