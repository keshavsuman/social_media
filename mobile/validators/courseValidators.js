const { celebrate, Joi } = require('celebrate');

module.exports.createCourse = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        duration: Joi.number().optional(),
    })
});

module.exports.deleteCourse = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()
    })
});

module.exports.updateCourse = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        duration: Joi.number().optional(),
    })
});
