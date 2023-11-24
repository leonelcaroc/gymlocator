import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Ratings from "../pages/Ratings/Ratings";
// import ContactUs from "../pages/ContactUs/ContactUs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/ratings" element={<Ratings />} />
      {/* <Route path="/contactus" element={<ContactUs />} /> */}
    </Route>
  )
);

export default router;
