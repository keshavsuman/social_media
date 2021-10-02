const { celebrate, Joi } = require('celebrate');

module.exports.otherUserProfile = celebrate({
    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().optional(),
    })
});


module.exports.setProfile = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        profile_pic:Joi.string().optional(),
        state:Joi.string().optional(),
        first_name:Joi.string().optional(),
        last_name:Joi.string().optional(),
        email:Joi.string().optional(),
        mobile:Joi.string().optional(),
        gender:Joi.string().optional(),
        bio:Joi.string().optional(),
        college:Joi.string().optional(),
        newCollege:Joi.string().optional(),
        course:Joi.string().optional(),
        skills: Joi.array().optional(),
        newSkill: Joi.array().optional(),
        interests: Joi.array().optional(),
        newInterest: Joi.array().optional(),
        college_year: Joi.string().optional(),
        college_batch: Joi.string().optional(),
        course_start_date:  Joi.string().optional(),
        course_end_date: Joi.string().optional()
    })
});