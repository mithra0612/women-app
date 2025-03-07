import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircleSegments from "../components/CircleSegments"; 
import ScratchCardComponent from "../components/ScratchCardComponent"; 

const RouterNavigator = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CircleSegments />} />
        <Route path="/scratch/:category" element={<ScratchCardComponent />} />
      </Routes>
    </Router>
  );
};

export default RouterNavigator;
