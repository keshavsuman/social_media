const { celebrate, Joi } = require('celebrate');

module.exports.createPost = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        content: Joi.string().required(),
        media_type: Joi.string().required(),
        visibility: Joi.string().required(),
        media_url: Joi.string().required(),
    })
});
