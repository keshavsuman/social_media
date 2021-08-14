const { celebrate, Joi } = require('celebrate');

module.exports.createCollege = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        university_id: Joi.string().optional(),
        course_id: Joi.array().optional()
    })
});

module.exports.deleteCollege = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()
    })
});

module.exports.updateCollege = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        university_id:Joi.string().optional(),
        course_id: Joi.array().optional()
    })
});
