import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Attractive from "./Pages/Attractive/Attractive";
import Audio from "./Pages/Audio/Audio";
import "./index.css";

function App() {
  return (
    <div id="layout">
      <CssBaseline />
      <Router> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/attractive' element={<Attractive />} />
          <Route path='/login' element={<Login />} />
          <Route path='/audio' element={<Audio />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
