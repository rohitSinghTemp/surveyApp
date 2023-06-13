
import SurveyRoom from "./components/surveyRoom.jsx";
import Welcome from "./components/welcome.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Closing from "./components/closing.jsx";
import {useEffect} from "react";

function App() {

    const navigate=useNavigate();
    useEffect(()=>{
        navigate("/");
    },[])
  return (
    <div className="bg-cyan-100 h-screen w-screen">

        <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/surveyRoom" element={<SurveyRoom/>}/>
            <Route path="/closing" element={<Closing/>}/>
        </Routes>
    </div>
  )
}

export default App
