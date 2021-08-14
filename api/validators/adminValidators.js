const { celebrate, Joi } = require('celebrate');

module.exports.login = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required()
    })
});

module.exports.forgotPassword = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
    })
});
module.exports.resetPassword = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        token: Joi.string().required(),
        password: Joi.string().required(),
        cpassword: Joi.string().required()
    })
});

module.exports.createAdmin = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        role_id: Joi.string().required(),
        name: Joi.string().required().max(30),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        mobile: Joi.string().required().max(30),
    })
});


module.exports.registerAdmin = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        role_id: Joi.string().required(),
        name: Joi.string().required().max(30),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        mobile: Joi.string().required().max(30),
        dob: Joi.string().optional(),
        gender: Joi.string().optional()
    })
});


module.exports.updateAdmin = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required().max(30),
        email: Joi.string().required().max(30),
        _id: Joi.string().required(),
        role_id: Joi.string().required(),
        status: Joi.any().required(),
        mobile: Joi.string().required().max(30),
    })
});

module.exports.addRole = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        modules: Joi.array().required()
    })
});
module.exports.updateRole = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        modules: Joi.array().required()
    })
});

module.exports.deleteRole = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()
    })
});


module.exports.deleteAdmin = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()
    })
});

module.exports.editRole = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()
    })
});
module.exports.editAdmin = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()
    })
});

module.exports.updateRoleStatus = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()
    })
});







