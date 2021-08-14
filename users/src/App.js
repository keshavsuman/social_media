import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import ProtectedRoute from './utils/protectedRoute/protectedRoute';
import IndexPage from './components/Authentication/index';
import ResetPassword from './components/Authentication/ResetPassword';
import Login from './components/Authentication/Login';
import OTP from './components/Authentication/OTP';

import Signup from './components/Authentication/Signup';
import UserQuestions from './components/Authentication/userQuestions';
import "./App.css"
import "react-datepicker/dist/react-datepicker.css";
import UserProfile from './components/User_Profile/User_Profile';
import EditUserProfile from './components/Edit_User_Profile/EditUserProfile';

function App() {
  return (
    <Router>
    {/* <Header /> */}
    {/* <Menu /> */}
      <Switch>
        {/* <ProtectedRoute exact path='/' component={withRouter(DashboardComponent)}  /> */}
        {/* <Route exact path="/home" component={withRouter(DashboardComponent)} /> */}
        <Route exact path="/" component={withRouter(IndexPage)} />
        <ProtectedRoute exact path="/resetPassword" component={withRouter(ResetPassword)} />
        <ProtectedRoute exact path="/login" component={  withRouter(Login)} />
        <ProtectedRoute exact path="/signup" component={withRouter(Signup)} />
        <ProtectedRoute exact path="/userProfile" component={withRouter(UserProfile)} />
        <ProtectedRoute exact path="/editUserProfile" component={withRouter(EditUserProfile)} />



      {/* 😎 PREM 😎 */}
      <ProtectedRoute path="/veriication" component={withRouter(OTP)} />
      <ProtectedRoute path="/questions" component={withRouter(UserQuestions)} />


      </Switch>
    </Router>
  )
}

export default App;
