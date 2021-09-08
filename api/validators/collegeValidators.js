const { celebrate, Joi } = require('celebrate');

module.exports.createCollege = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        university_id: Joi.string().optional(),
        course_id: Joi.array().optional()
    })
});

module.exports.deleteCollege = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required()
    })
});

module.exports.updateCollege = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        id: Joi.string().required(),
        name: Joi.string().optional(),
        university_id:Joi.string().optional(),
        course_id: Joi.array().optional(),
        status:Joi.string().optional(),
        isAutonomous:Joi.string().optional()
    })
});
