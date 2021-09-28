const { celebrate, Joi } = require('celebrate');

module.exports.createUniversity = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
    })
});

module.exports.deleteUniversity = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().optional()
    })
});

module.exports.updateUniversity = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
    })
});
