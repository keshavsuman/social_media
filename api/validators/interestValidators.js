const { celebrate, Joi } = require('celebrate');

module.exports.createInterest = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        photo: Joi.string().optional()
    })
});

module.exports.deleteInterest = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()
    })
});

module.exports.updateInterest = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        photo: Joi.string().optional(),
    })
});
