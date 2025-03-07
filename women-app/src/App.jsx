import React from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Chatbot from "./pages/homepage/AI_diet_planner";
import LandingPage from "./pages/homepage/homepage"; 

import ReproductivePhenomenas from "./pages/homepage/ReproductivePhenomena";
import Maternals from "./pages/homepage/maternal";
import SexualIntimateHealths from "./pages/homepage/SexualIntimateHealth";
import Blogs from "./pages/homepage/blogs";
import Cancers from "./pages/homepage/cancer";
import HormonalDisorders from "./pages/homepage/HormonalDisorder";
import ReproductiveDisorders from "./pages/homepage/ReproductiveDisorders";
import Sanitarys from "./pages/homepage/sanitary";
import Disposals from "./pages/homepage/disposal";
import Openwastes from "./pages/homepage/openwaste";
import Flushs from "./pages/homepage/flush";
import Burns from "./pages/homepage/burn";
import Burys from "./pages/homepage/bury";
import Wraps from "./pages/homepage/wrap";
import Recycles from "./pages/homepage/recycle";
import PeriodTrackers from "./pages/homepage/period_tracker";
import PregnancyTrackers from "./pages/homepage/pregnancy_tracker";
import Spinners from "./pages/homepage/spinner";
import Schemes from "./pages/homepage/Schemes";
import CommunityForums from "./pages/homepage/CommunityForum";
import Helps from "./pages/homepage/help";
import Remedies from "./pages/homepage/remedies";
import Periods from "./pages/homepage/periods";
import Pregnancys from "./pages/homepage/pregnancy";
import Hormonals from "./pages/homepage/hormonal";
import Reproductives from "./pages/homepage/reproductive";
import Breasts from "./pages/homepage/breast";
import Mentals from "./pages/homepage/mental";
import Menopauses from "./pages/homepage/menopause";
import FloatingChatbot from "./pages/homepage/FloatingChatbot";

function App() {
  const location = useLocation();
  const hideSidebarPaths = ["/", "/community-forum"];  // Added "/" to hide sidebar on homepage

  return (
    <div className="flex">
      {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
      <div className={location.pathname === "/" ? "w-full" : "flex-1 p-4"}>
        <Routes>
          {/* Homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<LandingPage />} />
          
          {/* Main Pages */}
          <Route path="/reproductive-phenomena" element={<ReproductivePhenomenas />} />
          <Route path="/maternal-health" element={<Maternals />} />
          <Route path="/sexual-intimate-health" element={<SexualIntimateHealths />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/cancer" element={<Cancers />} />
          <Route path="/hormonal-disorders" element={<HormonalDisorders />} />
          <Route path="/reproductive-disorders" element={<ReproductiveDisorders />} />
          <Route path="/sanitary" element={<Sanitarys />} />
          <Route path="/period-tracker" element={<PeriodTrackers />} />
          <Route path="/pregnancy-tracker" element={<PregnancyTrackers />} />
          <Route path="/remedies" element={<Remedies />} />
          <Route path="/ai-diet" element={<Chatbot />} />  
          
          {/* Spinner and its Subcategories */}
          <Route path="/spinner" element={<Spinners />} />

          {/* Additional routes for direct access */}
          <Route path="/breast" element={<Breasts />} />
          <Route path="/periods" element={<Periods />} />
          <Route path="/pregnancy" element={<Pregnancys />} />
          <Route path="/hormonal" element={<Hormonals />} />
          <Route path="/reproductive" element={<Reproductives />} />
          <Route path="/mental" element={<Mentals />} />
          <Route path="/menopause" element={<Menopauses />} />
          {/* Additional routes for direct access */}
          <Route path="/breast" element={<Breasts />} />
          <Route path="/periods" element={<Periods />} />
          <Route path="/pregnancy" element={<Pregnancys />} />
          <Route path="/hormonal" element={<Hormonals />} />
          <Route path="/reproductive" element={<Reproductives />} />
          <Route path="/mental" element={<Mentals />} />
          <Route path="/menopause" element={<Menopauses />} />

          <Route path="/schemes" element={<Schemes />} />
          <Route path="/community-forum" element={<CommunityForums />} />
          <Route path="/help" element={<Helps />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/community-forum" element={<CommunityForums />} />
          <Route path="/help" element={<Helps />} />

          {/* Disposal Methods and Subpages */}
          <Route path="/disposals" element={<Disposals />} />
          <Route path="/disposals/flush" element={<Flushs />} />
          <Route path="/disposals/burn" element={<Burns />} />
          <Route path="/disposals/wrap" element={<Wraps />} />
          <Route path="/disposals/bury" element={<Burys />} />
          <Route path="/disposals/openwaste" element={<Openwastes />} />
          <Route path="/disposals/recycle" element={<Recycles />} />
        </Routes>
      </div>
      {location.pathname !== "/" && <FloatingChatbot/>}  {/* Hide chatbot on homepage */}
    </div>
  );
}

export default App;

