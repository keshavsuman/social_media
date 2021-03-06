const express = require('express');
const router = express.Router();
const admin = require('./admin');
const user = require('./user');

router.get('/api/web/v1/admin', function (req, res, next) {
  res.send('Welcome to younity Admin Apis');
});
router.get('/api/web/v1/user', function (req, res, next) {
  res.send('Welcome to younity User Apis');
});
router.use('/api/web/v1/admin', admin);
router.use('/api/web/v1/user', user);


module.exports = router;
