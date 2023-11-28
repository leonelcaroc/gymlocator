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

      <Route path="/admin" element={<Admin />}>
        <Route index={true} path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage" element={<AdminGymManage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
