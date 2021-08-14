import showToast from "../../utils/toast/toast";
const apiconfig = require('../config/config')
const serviceroutes = require('../config/serviceroutes')
const token_service = require('../../utils/Auth/token_utils')
const axios = require('axios')


export const userSignup = async (user, url = apiconfig.baseurl + serviceroutes.usersignup) => {
  var response = await axios.post(url, user)
  if (response.data.statusCode === 200) {
    return response.data;
  } else {
    return response.data;
  }
}

export const userLogin = async (email, password, url = apiconfig.baseurl + serviceroutes.userlogin) => {
    var response = await axios.post(url, {
      email: email,
      password: password
    })
    if (response.data.statusCode === 200) {
      token_service.setToken(response.data.data.token)
      return response.data;
    } else {
      return response.data;
    }
}
  
  
export const forgotPassword = async (email, url = apiconfig.baseurl + serviceroutes.forgotPassword) => {
    var response = await axios.post(url, {
      email: email
    })
    return response.data;
  }
  

  export const getCoursesList = async (url = apiconfig.baseurl + serviceroutes.getCoursesList) => {
    const config = {
      headers: { Authorization: `Bearer ${token_service.getToken()}` }
    };
    var response = await axios.get(url, config)
    console.log("response is: ", response);
    return response.data;
  }

  export const getCollegesList = async (url = apiconfig.baseurl + serviceroutes.getCollegesList) => {
    const config = {
      headers: { Authorization: `Bearer ${token_service.getToken()}` }
    };
    var response = await axios.get(url, config)
    console.log("response is: ", response);
    return response.data;
  }

  export const getSkillsList = async (url = apiconfig.baseurl + serviceroutes.getSkillsList) => {
    const config = {
      headers: { Authorization: `Bearer ${token_service.getToken()}` }
    };
    var response = await axios.get(url, config)
    console.log("response is: ", response);
    return response.data;
  }

  export const getInterestsList = async (url = apiconfig.baseurl + serviceroutes.getInterestsList) => {
    const config = {
      headers: { Authorization: `Bearer ${token_service.getToken()}` }
    };
    var response = await axios.get(url, config)
    console.log("response is: ", response);
    return response.data;
  }

  export const getStates = async (url = apiconfig.baseurl + serviceroutes.getStates + "?country_id=101") => {
    var response = await axios.get(url);
    return response.data;
  }

  export const getHomeTown = async (state_id, url = apiconfig.baseurl + serviceroutes.getCities + "?state_id=" + state_id) => {
    var response = await axios.get(url);
    return response.data;
  }
  export const setProfile = async (questionData ,filtered_skill_id,filtered_interest_id, url = apiconfig.baseurl + serviceroutes.setProfile) => {
    const config = {
      headers: { Authorization: `Bearer ${token_service.getToken()}` }
    };
    questionData.skills=filtered_skill_id;
    questionData.interests=filtered_interest_id;
    var response = await axios.post(url, questionData, config)
    if (response.data.statusCode === 200) {
      return response.data;
    } else {
      return response.data;
    }
  }


  export const socialLogin = async (userData, url = apiconfig.baseurl + serviceroutes.userSocialLogin) => {
    const config = {
      headers: { Authorization: `Bearer ${token_service.getToken()}` }
    };
    var response = await axios.post(url, userData, config);
    if(response.data.statusCode !== 200){
      showToast(response.data.message, 'error'); 
    }else{
      token_service.setToken(response.data.data.token)
      localStorage.setItem("user_data",JSON.stringify(response.data.data.user_data));
      showToast(response.data.message, 'success');
    }
    return response;
  }

  export const myProfile = async (url = apiconfig.baseurl + serviceroutes.myProfile) => {
    const config = {
      headers: { Authorization: `Bearer ${token_service.getToken()}` }
    };
    var response = await axios.get(url, config)
    console.log("response is: ", response);
    return response.data;
  }

