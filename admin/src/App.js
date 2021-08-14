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
import UserManagement from "./components/Dashboard/DashboardComponents/UsrManagement";
import RolesManagement from "./components/Dashboard/DashboardComponents/RolesManagement";

import UserProfile from "./components/Dashboard/DashboardComponents/UserProfile/UserProfile";
// import Dashboard from './components/newDashboard/Dashboard';

function App() {
  if (localStorage.getItem("role") === "superadmin") {
  }
  return (
    <Router>
      {/* <Header /> */}
      {/* <Menu /> */}
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={withRouter(DashboardComponent)}
        />

        <ProtectedRoute
          exact
          path="/home"
          component={withRouter(DashboardComponent)}
        />
        <Route exact path="/login" component={withRouter(Login)} />
        <ProtectedRoute
          path="/forgotPassword"
          component={withRouter(ForgotPassword)}
        />

<ProtectedRoute
          path="/roles-management"
          component={withRouter(RolesManagement)}
        />
        
        <ProtectedRoute
          path="/universities-management"
          component={withRouter(Universities)}
        />
        <ProtectedRoute
          path="/collages-management"
          component={withRouter(Collage)}
        />
        <ProtectedRoute
          path="/courses-management"
          component={withRouter(Courses)}
        />

        {localStorage.getItem("role") === "superadmin" ? (
          <ProtectedRoute
            path="/admin-management"
            component={withRouter(AdminManagement)}
          />
        ) : (
          <ProtectedRoute
            exact
            path="/admin-management"
            component={withRouter(AdminManagement)}
          />
        )}

        <ProtectedRoute
          path="/skills-management"
          component={withRouter(Skills)}
        />
        <ProtectedRoute
          path="/interests-management"
          component={withRouter(Interest)}
        />
        <ProtectedRoute
          path="/user-management"
          component={withRouter(UserManagement)}
        />
        <ProtectedRoute
          path="/admin/user-profile/:id"
          component={withRouter(UserProfile)}
        />
      </Switch>
    </Router>
  );
}

export default App;
