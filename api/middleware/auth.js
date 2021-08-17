const jwt = require('jsonwebtoken')
const config = require('../config/config');
const Admin = require('../models/admin');
const AdminToken = require('../models/admin_token');
const auth = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, config.secretKey);
            const user = await Admin.findOne({ _id: data._id });
            if (session) {
                req.user = user;
                req.token = token;
                next();
            } else {
                throw new Error();
            }
            
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({ status :401,message: 'Not authorized to access this resource' })
    }
}
module.exports = auth