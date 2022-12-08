import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import "./index.css";
import { AppContext } from "./Context/AppContext";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Attractive from "./Pages/Attractive/Attractive";
import Audio from "./Pages/Audio/Audio";
import AudioQn from "./Pages/AudioQn/AudioQn";
import Description from "./Pages/Description/Description";
import Complete from "./Pages/Complete/Complete";
import Overview from "./Pages/Overview/Overview";
import DashboardLayout from "./Layout/DashboardLayout";
import Details from "./Pages/Details/Details";


function App() {

  const [open, setOpen] = useState(true);

  return (
    <div id="app">
      <CssBaseline />
      <AppContext.Provider
        value={{open, setOpen}}
      >
      <Router> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/details' element={<Details />} />
          <Route path='/attractive' element={<Attractive />} />
          <Route path='/attractive/:id' element={<Description />} />
          <Route path='/audio' element={<Audio />} />
          <Route path='/audio/q1' element={<AudioQn key="q1" title="1" link="audio/q2" ratingType="audio1Rating"/>} />
          <Route path='/audio/q2' element={<AudioQn key="q2" title="2" link="complete" ratingType="audio2Rating"/>} />
          <Route path='/complete' element={<Complete />} />    
        
        <Route element={<DashboardLayout />}>
            <Route path='/overview' element={<Overview />} />


            {/* FOR TESTING */}
            <Route path='/test' element={<Overview />} />
        </Route>
        </Routes>
      </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
