const jwt = require('jsonwebtoken')
const config = require('../config/config');
const User = require('../models/user');
const UserToken = require('../models/user_token');

const auth = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = jwt.verify(token, config.secretKey);
            req.data = data;
            next();
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({ status: 401, message: 'Not authorized to access this resource' })
    }
}
module.exports = auth