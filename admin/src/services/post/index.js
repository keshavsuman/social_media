import * as opsService from '../config/ops'
import {baseurl} from '../config/config'
import serviceroutes from '../config/serviceroutes'
const addPost = (post, token) => {
    return new Promise(function (resolve, reject) {
        opsService.post(baseurl+'post/save', post, token)
        .then(data => resolve(data)).catch(e => reject(e))
    })
},
updatePost = (data, token) => {
    return new Promise(function (resolve, reject) {
        opsService.put(baseurl+'post/update/'+data.id, data, token)
        .then(data => resolve(data)).catch(e => reject(e))
    })
},
approvedPost = (data, token) => {
    return new Promise(function (resolve, reject) {
        opsService.post(baseurl+serviceroutes.approvedPost, data.id, token)
        .then(data => resolve(data)).catch(e => reject(e))
    })
},
getPost = (data, token) => {
    return new Promise(function (resolve, reject) {
        opsService.get(baseurl+'post/getById/'+data, token)
        .then(data => resolve(data)).catch(e => reject(e))
    })
},
getPostBySlug = (data) => {
    return new Promise(function (resolve, reject) {
        opsService.get(baseurl+'post/getBySlug/'+data)
        .then(data => resolve(data)).catch(e => reject(e))
    })
},
deletePost = (data, token) => {
    const formData = new FormData()
    formData.append('query', data.query)
    return new Promise(function (resolve, reject) {
        opsService.deleteData(baseurl+'post/delete/'+data, token)
        .then(data => resolve(data)).catch(e => reject(e))
    })
},
getPosts = async (type, token) => {
    console.log('type', type)
    let result = await opsService.get(baseurl+serviceroutes.postList+type, token)
    return result;
}
export {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
    getPostBySlug,
    approvedPost
}