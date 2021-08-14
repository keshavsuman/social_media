

module.exports.sendResponse = async (res, statusCode, msg, data) => {
    return res.send({
        "statusCode": statusCode,
        "message": msg,
        "data":data
    });
}



