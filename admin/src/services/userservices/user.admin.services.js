const apiconfig = require('../config/config')
const serviceroutes = require('../config/serviceroutes')
const axios = require('axios')


export const adminLogin = async (email, password, url = apiconfig.baseurl + serviceroutes.adminlogin) => {
  var response = await axios.post(url, {
    email: email,
    password: password
  })
  if (response.data.status === 200) {
    localStorage.setItem("access_token", response.data.data.token)
    localStorage.setItem("username", response.data.data.user_data.name)
    localStorage.setItem("role", response.data.data.user_data.role)
    
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

export const createSkill = async (skillname, accessToken, url = apiconfig.baseurl + serviceroutes.createSkill) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };

  var response = await axios.post(url, {
    name: skillname,
  },
    config
  )
  return response.data;
}

export const updateSkill = async (_id, skillname, accessToken, url = apiconfig.baseurl + serviceroutes.updateSkill) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
  var response = await axios.post(url, {
    _id: _id,
    name: skillname,
  },
    config
  )
  return response.data;
}

export const editSkill = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.editSkill) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}


export const deleteSkill = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.deleteSkill) => {

  console.log("--------------------------------------" + accessToken);
  var response = await axios.delete(url + _id,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return response.data;
}



export const editUniversity = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.editUniversity) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}


export const userProfile = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.userProfile) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}





export const getUniversitiesList = async (accessToken, url = apiconfig.baseurl + serviceroutes.getUniversitiesList) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
  var response = await axios.get(url, config)
  console.log("response is: ", response);
  return response.data;
}


export const createUniversity = async (universityname, accessToken, url = apiconfig.baseurl + serviceroutes.createUniversity) => {
  const config = {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  };

  var response = await axios.post(url, {
    name: universityname,
  },
    config
  )
  return response.data;
}












export const dashBoard = async (accessToken, url = apiconfig.baseurl + serviceroutes.dashBoard) => {

  console.log("--------------------------------------" + accessToken);
  var response = await axios.get(url,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return response.data;
}

export const deleteUniversity = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.deleteUniversity) => {

  console.log("--------------------------------------" + accessToken);
  var response = await axios.delete(url + _id,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return response.data;
}


export const updateUniversity = async (_id, universityname, accessToken, url = apiconfig.baseurl + serviceroutes.updateUniversity) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
  var response = await axios.post(url, {
    _id: _id,
    name: universityname,
  },
    config
  )
  return response.data;
}


// Interests-----------------Interests --------------------------------Interests

export const createInterest = async (interestname, accessToken, photo,url = apiconfig.baseurl + serviceroutes.createInterest) => {
  const config = {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  };

  var response = await axios.post(url, {
    name: interestname,
    photo:photo
  },
    config
  )
  return response.data;
}

export const deleteInterest = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.deleteInterest) => {

  console.log("--------------------------------------" + accessToken);
  var response = await axios.delete(url + _id,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return response.data;
}


export const updateInterest = async (_id, intrest, accessToken,photo, url = apiconfig.baseurl + serviceroutes.updateInterest) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
  var response = await axios.post(url, {
    _id: _id,
    name: intrest,
    photo:photo
  },
    config
  )
  return response.data;
}

export const editInterest = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.editInterest) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}

// Courses --------------------Courses--------------------------------------

export const updateCourses = async (_id, universityname, accessToken, url = apiconfig.baseurl + serviceroutes.updateCourse) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
  var response = await axios.post(url, {
    _id: _id,
    name: universityname,
  },
    config
  )
  return response.data;
}


export const editCourses = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.editCourse) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}


export const deleteCourses = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.deleteCourse) => {

  console.log("--------------------------------------" + accessToken);
  var response = await axios.delete(url + _id,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return response.data;
}


export const createcourses = async (model, accessToken, url = apiconfig.baseurl + serviceroutes.createCourse) => {
  const config = {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  };

  var response = await axios.post(url, model,
    config
  )
  return response.data;
}

// Collage ------------------------Collage-----------------------------Collage
export const createCollege = async (model, accessToken, url = apiconfig.baseurl + serviceroutes.createCollege) => {
  const config = {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  };

  var response = await axios.post(url, model,
    config
  )
  return response.data;

}

export const deleteCollege = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.deleteCollege) => {

  console.log("--------------------------------------" + accessToken);
  var response = await axios.delete(url + _id,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return response.data;
}


export const updateCollege = async (_id, college, accessToken,university_id,courses ,url = apiconfig.baseurl + serviceroutes.updateCollege) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
  var response = await axios.post(url, {
    _id: _id,
    name: college,
    university_id:university_id,
    course_id:courses
  },
    config
  )
  console.log(response);
  return response.data;
}

export const editCollege = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.editCollege) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}


export const searchCourses = async (name, accessToken, url = apiconfig.baseurl + serviceroutes.searchCourse) => {

  var response = await axios.get(url + name, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  if (response.data.status === 200) {
    return response.data;
  } else {
    return response.data;
  }
}

export const getCoursesList = async ( accessToken, url = apiconfig.baseurl + serviceroutes.getCoursesList) => {

  var response = await axios.get(url , {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  if (response.data.status === 200) {
    return response.data;
  } else {
    return response.data;
  }
}





export const editAdmin = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.editAdmin) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}

export const deleteAdmin = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.deleteAdmin) => {

  console.log("--------------------------------------" + accessToken);
  var response = await axios.delete(url + _id,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return response.data;
}

export const updateAdmin = async (_id, status ,name,email,mobile,role_id,url = apiconfig.baseurl + serviceroutes.updateAdmin) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
  };
  var response = await axios.post(url, {
    _id: _id,
   status:status,
   name:name,
   email:email,
   mobile:mobile,
   role_id:role_id

  },
    config
  )
  console.log(response);
  return response.data;
}

export const updateUser = async (_id, status ,url = apiconfig.baseurl + serviceroutes.updateUser) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
  };
  var response = await axios.post(url, {
    _id: _id,
   status:status
   

  },
    config
  )
  console.log(response);
  return response.data;
}

export const editUser = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.editUser) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}
// permissions
export const permissionList = async ( accessToken,url = apiconfig.baseurl + serviceroutes.permissionList) => {
  
  var response = await axios.get(url,{
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  
  return response.data;
}





export const updateCollegeStatus = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.updateCollegeStatus) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}


export const updateRoleStatus = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.updateRoleStatus) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}

export const updateUniversityStatus = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.updateUniversityStatus) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}

export const updateSkillStatus = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.updateSkillStatus) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}

export const updateInterestStatus = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.updateInterestStatus) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}


export const updateCourseStatus = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.updateCourseStatus) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}


export const updateUserStatus = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.updateUserStatus) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}

export const updateAdminStatus = async (_id, accessToken, url = apiconfig.baseurl + serviceroutes.updateAdminStatus) => {
  
  var response = await axios.get(url + _id, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}

export const RoleList = async ( accessToken, url = apiconfig.baseurl + serviceroutes.getRolesList) => {
  
  var response = await axios.get(url , {
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  )
  return response.data;
}
//
export const createAdmin = async (model,  url = apiconfig.baseurl + serviceroutes.createAdmin) => {
  const config = {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
  };

  var response = await axios.post(url, model,
    config
  )
  return response.data;

}


export const addRole = async (model,  url = apiconfig.baseurl + serviceroutes.addRole) => {
  const config = {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
  };

  var response = await axios.post(url, model,
    config
  )
  return response.data;

}