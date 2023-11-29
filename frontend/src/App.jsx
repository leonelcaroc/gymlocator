import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Admin from "./pages/Admin";
import AdminDashboard from "./layout/AdminDashboard/AdminDashboard";
import AdminGymManage from "./layout/AdminGymManage/AdminGymManage";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

import GymSignUpDetails from "./pages/GymSignUpDetails";
import GymSignUpInfo from "./pages/GymSignUpInfo";
import GymSignUpPermit from "./pages/GymSignUpPermit";
import GymOwnerLogin from "./pages/GymOwnerLogin";
import GymOwner from "./pages/GymOwner";
import GymOwnerDashboard from "./layout/GymOwnerDashboard/GymOwnerDashboard";
import GymOwnerProfile from "./layout/GymOwnerProfile/GymOwnerProfile";
import GymOwnerMemberManagement from "./layout/GymOwnerMemberManagement/GymOwnerMemberManagement";
import GymOwnerAnnouncement from "./layout/GymOwnerAnnouncement/GymOwnerAnnouncement";
import GymOwnerClasses from "./layout/GymOwnerClasses/GymOwnerClasses";

import GymOwnerAmenities from "./layout/GymOwnerAmenities/GymOwnerAmenities";
import GymOwnerDetails from "./layout/GymOwnerDetails/GymOwnerDetails";
import GymOwnerEquipments from "./layout/GymOwnerEquipments/GymOwnerEquipments";
import GymOwnerPlans from "./layout/GymOwnerPlans/GymOwnerPlans";
import GymOwnerServices from "./layout/GymOwnerServices/GymOwnerServices";
import GymOwnerTrainers from "./layout/GymOwnerTrainers/GymOwnerTrainers";
import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/gym/details" element={<GymSignUpDetails />} />
      <Route path="/gym/info" element={<GymSignUpInfo />} />
      <Route path="/gym/signup" element={<GymSignUpPermit />} />
      <Route path="/gym/login" element={<GymOwnerLogin />} />

      <Route path="/admin" element={<Admin />}>
        <Route index={true} element={<AdminDashboard />} />
        <Route path="manage" element={<AdminGymManage />} />
      </Route>

      <Route path="/gymowner" element={<GymOwner />}>
        <Route index={true} element={<GymOwnerDashboard />} />
        <Route path="profile" element={<GymOwnerProfile />} />
        <Route path="member" element={<GymOwnerMemberManagement />} />
        <Route path="announcement" element={<GymOwnerAnnouncement />} />
        <Route path="classes" element={<GymOwnerClasses />} />
        <Route path="amenities" element={<GymOwnerAmenities />} />
        <Route path="details" element={<GymOwnerDetails />} />
        <Route path="equipments" element={<GymOwnerEquipments />} />
        <Route path="plans" element={<GymOwnerPlans />} />
        <Route path="services" element={<GymOwnerServices />} />
        <Route path="trainers" element={<GymOwnerTrainers />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
