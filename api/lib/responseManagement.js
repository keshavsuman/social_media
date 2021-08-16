
module.exports.sendResponse = async (res, statusCode, msg, data) => {
    return res.send({
        "status": statusCode,
        "message": msg,
        "description":data
    });
}



