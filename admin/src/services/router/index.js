const navigateTo = (route, data = null) => {
    getLocationData().href = route
},
getLocationData = () => {
    let currentUrl = window.location
    return currentUrl
},
URLToArray = (url) => {
    let request = {}, pairs = url.substring(url.indexOf('?') + 1).split('&')
    for (var i = 0; i < pairs.length; i++) {
        if(!pairs[i])
        continue
        let pair = pairs[i].split('=')
        request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
    }
    return request
},
urlToSplitData = (url) => {
    return url.split('/')
},
ArrayToURL = (array) => {
  var pairs = []
    for (var key in array)
    if (array.hasOwnProperty(key))
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]))
    return pairs.join('&')
}
export {
    getLocationData,
    navigateTo,
    URLToArray,
    ArrayToURL,
    urlToSplitData
}