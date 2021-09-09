const { celebrate, Joi } = require('celebrate');

module.exports.login = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required()
    })
});

module.exports.socialLogin = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        email: Joi.any().optional(),
        provider_type: Joi.string().required(),
        provider_id: Joi.string().required(),
        // first_name: Joi.string().required(),
        name: Joi.string().required(),
        profile_pic: Joi.string().required()
    })
});

module.exports.registerUser = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        mobile: Joi.string().optional(),
        home_town: Joi.string().optional(),
        state: Joi.string().optional(),
        country: Joi.string().optional(),
        gender: Joi.string().optional(),
        profile_pic: Joi.string().optional(),
        dob: Joi.string().optional(),
        password: Joi.string().required()
    })
});





module.exports.updateProfilePic = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        id: Joi.number().required(),
        profile_pic: Joi.string().required(),
    })
});

module.exports.followunfollowValidator = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required(),
        operation: Joi.string().required(),
    })})