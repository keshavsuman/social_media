import { baseurl } from '../config/config';
import * as opsService from '../config/ops'
import serviceroutes from '../config/serviceroutes';
const addUser = (data, token) => {
    return   opsService.post(baseurl+'user/save', data, token)
},
updateUser = async (data, token) =>{
    try {
        let result = await opsService.put(baseurl+`user/update`, data, token);
        return result
    } catch (e){
        return {status:false, data:{}, message:e.message}
    }
},
registerUser = async (data, token) =>{
    console.log('data, token', data, token)
    try {
        let result = await opsService.post(baseurl+`user/register`, data, token);
        return result
    } catch (e){
        return {status:false, data:{}, message:e.message}
    }
},
verifyOtp = async (data) => {
    try {
        let result = await opsService.post(baseurl+`user/verifyOtp`, data);
        return result
    } catch (e){
        return {status:false, data:{}, message:e.message}
    }
},
getUser = async (data, token) => {
    return await opsService.get(baseurl+serviceroutes.userProfile+data, token)
},
getUserPlan = async token => {
    return await opsService.get(baseurl+'user/getPlan', token)
},
getAdminUserPlan = async (id, token) => {
    return await opsService.get(baseurl+'admin/user/getPlan/'+id, token)
},
deleteUser = async (data, token) => {
    return  opsService.deleteData(baseurl+'user/delete/'+data, token)
},
getUsers = (token) => {
    return new Promise( (resolve, reject) => {
        opsService.get(baseurl+serviceroutes.getAllUserList, token)
        .then(data => resolve(data)).catch(e => reject(e))
    })
},
logout = () => {
    localStorage.removeItem('state');
    return true
},
login = (userData) => {
    return (dispatch) => {
        dispatch({
            type: 'LOGIN',
            data: userData
        })
    }
},
getLoggedInUserData = () => {
    let userData = (localStorage.getItem('tempLogin') === 'true') ? localStorage.getItem('tempUserData') : localStorage.getItem('userData')
    return userData === null ? userData : JSON.parse(userData)
},
updateLocalUser = (data) =>{
    let existState = JSON.parse(localStorage.getItem('state'));
    for (var key in data) {
        existState[key] = data[key]
    }
    localStorage.setItem('state',JSON.stringify(existState));
},
isAdmin = () => {
    if (localStorage.getItem('userData') !== null) {
        return getLoggedInUserData().role === 'admin'
    } else {
        return false
    }
},
isSuperVisor = () => {
    if (localStorage.getItem('userData') !== null) {
        return getLoggedInUserData().role === 'supervisor'
    } else {
        return false
    }
},
sendOtp = async (data, token=false) => {
    const formData = new FormData()
    if (data.mobile) {
        formData.append('mobile',data.mobile)
    } else {
        formData.append('email',data.email)
    }
    let url = !token?`user/sendotp`:`user/sendupdateotp`
    try {
        let result = await opsService.post(baseurl+url, formData, token);
        return result
    } catch (e){
        return {status:false, data:{}, message:e.message}
    }
},
resentLoginOtp = async (data) => {
    try {
        let result = await opsService.post(baseurl+`user/resentLoginOtp`, data);
        return result
    } catch (e){
        return {status:false, data:{}, message:e.message}
    }
},

sendInvite = async (data, token)=>{
    try {
        let result = await opsService.post(baseurl+`sendReferralInvite`, data, token);
        return result
    } catch (e){
        return {status:false, data:{}, message:e.message}
    }
},
getWallet = async (token)=>{
    return new Promise( (resolve, reject) => {
        opsService.get(baseurl+'user/getwallet', token)
        .then(data => resolve(data)).catch(e => reject(e))
    })
},
fetchAllUsers = async (token)=>{
    try {
        let result = await opsService.get(baseurl+`admin/users/fetchAll`, token);
        return result
    } catch(e){
        return e
    }
},
fetchAllAdminUsers = async (data, token)=>{
    try {
        let result = await opsService.post(baseurl+`admin/users/fetchAll`, data, token);
        return result
    } catch(e){
        return e
    }
},
fetchAllAdmins = async (token)=>{
    try {
        let result = await opsService.get(baseurl+`admin/admins/fetchAll`, token);
        return result
    } catch(e){
        return e
    }
},
fetchByPhone = async (phone, token) =>{
    let result = await opsService.get(baseurl+`user/fetchByPhone/`+phone, token);
    return result
},
fetchByEmail = async (email, token) =>{
    let result = await opsService.get(baseurl+`user/fetchByEmail/`+email, token);
    return result;
},
upgradeUserSubscription = async (data, token)=>{
    return await opsService.post(baseurl+`admin/user/upgrade/subscription`, data, token);
    
}
export {
    updateLocalUser,
    verifyOtp,
    getLoggedInUserData,
    logout,
    login,
    sendOtp,
    sendInvite,
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    isAdmin,
    isSuperVisor,
    getUserPlan,
    getAdminUserPlan,
    registerUser,
    getWallet,
    fetchAllUsers,
    fetchAllAdminUsers,
    fetchAllAdmins,
    fetchByPhone,
    fetchByEmail,
    upgradeUserSubscription,
    resentLoginOtp
}