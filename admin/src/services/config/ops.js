import * as axios from 'axios';
// import * as miscService from '../services/Misc';
import * as RouterService from '../router/index';

const exceptionUrl = ['testimonial', 'setting', 'post', 'faq','job','plan','gstcode']
axios.interceptors.request.use(function (config) {
    const found = exceptionUrl.find(v => config.url.includes(v));
    if(found === undefined){
        // miscService.showpreloader()
    }
    return config
}, function (error) {
    console.log('error',error)
    // miscService.hidepreloader()
    return Promise.reject(error);
});
  
axios.interceptors.response.use(function (response) {
    // miscService.hidepreloader()
    return response;
}, function (error) {
    if(error && error.message){
        if(error.message.includes(401)){
            localStorage.clear()
            RouterService.navigateTo('/login');
            return;
        }
    }
    // miscService.hidepreloader()
    return Promise.reject(error);
});
const post = async (url = '', data, token=false) => {
    if(token){
        token = 'Bearer '+token;
    }
    let response = await axios.post(url, data, { headers: { Authorization: token }});
    return response.data;
}
const put = async (url = '', data, token=false) => {
    if(token){
        token = 'Bearer '+token;
    }
    let response = await axios.put(url, data, { headers: { Authorization: token }});
    return response.data;
}
const get = async (url = '', token=false) => {
    if(token){
        token = 'Bearer '+token;
    }
    let response = await axios.get(url, { headers: { Authorization: token }});
    return response.data;
}
const deleteData = async (url = '', token=false) => {
    if(token){
        token = 'Bearer '+token;
    }
    let response = await axios.delete(url, { headers: { Authorization: token }});
    return response.data;
}

export async function downloadFile(fileUrl, data, token=false) {
    if(token){
        token = 'Bearer '+token;
    }
    axios.post(fileUrl, data,
        {responseType: 'blob', headers: { Authorization: token, 'Access-Control-Allow-Origin': '*' }}
    ).then(function (response) {
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = data.fileName.indexOf('.pdf') === -1?data.fileName+'.pdf':data.fileName
            link.click()
        }
    );
}
export {
    post,
    get,
    deleteData,
    put
}