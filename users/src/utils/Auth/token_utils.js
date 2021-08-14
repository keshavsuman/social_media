const setToken = (access_token) => {
    localStorage.setItem('access_token', access_token);
    return true;
}

const getToken = () => {
    const token = localStorage.getItem('accessToken');
    if(token){
        return token;
    }else{
        return false;
    }

}

const setUserData = (user_data) => {
     localStorage.setItem("user_data",JSON.stringify(user_data));
}
const getUserData = () => {
    const user_data = localStorage.getItem('user_data');
    if(user_data){
        return JSON.parse(user_data);
    }else{
        return false;
    }

}

module.exports = {
    setToken,
    getToken,
    setUserData,
    getUserData
}