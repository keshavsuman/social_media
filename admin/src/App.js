import "./App.css";
import Login from "./components/Auth/login";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import ForgotPassword from "./components/Auth/forgotPassword";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import DashboardComponent from "./components/Dashboard/dashboard";
import Universities from "./components/Dashboard/DashboardComponents/Universities";
import Collage from "./components/Dashboard/DashboardComponents/Collage";
import Courses from "./components/Dashboard/DashboardComponents/Courses";
import AdminManagement from "./components/Dashboard/DashboardComponents/AdminManagement";
import Skills from "./components/Dashboard/DashboardComponents/Skills";
import Interest from "./components/Dashboard/DashboardComponents/Interest";
import ProtectedRoute from "./utils/protectedRoute/protectedRoute";
import UserManagement from "./components/Dashboard/DashboardComponents/UserManagement";
import RolesManagement from "./components/Dashboard/DashboardComponents/RolesManagement";
import UserProfile from "./components/Dashboard/DashboardComponents/UserProfile/UserProfile";
// import Dashboard from './components/newDashboard/Dashboard';
import "./scss/style.scss";
import "react-toastify/dist/ReactToastify.css";
import ApprovedPost from "./components/Dashboard/DashboardComponents/ApprovedPost";
import UnapprovedPost from "./components/Dashboard/DashboardComponents/UnapprovedPost";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  if (localStorage.getItem("role") === "superadmin") {
  }
  return (
    <Router>
      {/* <Header /> */}
      {/* <Menu /> */}
      <Switch>
        <Route exact path="/admin" component={DashboardComponent} />
        <Route exact path="/home" component={DashboardComponent} />
        <Route exact path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/roles-management" component={RolesManagement} />
        <Route path="/universities-management" component={Universities} />
        <Route path="/collages-management" component={Collage} />
        <Route path="/courses-management" component={Courses} />
        <Route path="/unapproved-post" component={UnapprovedPost} />
        <Route path="/approved-post" component={ApprovedPost} />
        {localStorage.getItem("role") === "superadmin" ? (
          <Route path="/admin-management" component={AdminManagement} />
        ) : (
          <Route exact path="/admin-management" component={AdminManagement} />
        )}
        <Route path="/skills-management" component={Skills} />
        <Route path="/interests-management" component={Interest} />
        <Route path="/user-management" component={UserManagement} />
        <Route path="/admin/user-profile/:id" component={UserProfile} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </Router>
  );
}

export default App;
