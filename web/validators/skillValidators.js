const { celebrate, Joi } = require('celebrate');

module.exports.createSkill = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
    })
});

module.exports.deleteSkill = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()
    })
});

module.exports.updateSkill = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
    })
});
