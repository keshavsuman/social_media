const { celebrate, Joi } = require('celebrate');

module.exports.createPost = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        content: Joi.string().required(),
        media_type: Joi.string().required(),
        visibility: Joi.string().required(),
        media_url: Joi.string().optional(),
    })
});
 
module.exports.updatePost = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        id:Joi.string().required(),
        content: Joi.string().required(),
        media_type: Joi.string().required(),
        visibility: Joi.string().required(),
        media_url: Joi.string().optional(),
    })
});

module.exports.deletePost = celebrate({
    body: Joi.object().options({ abortEarly: false }).keys({
        id:Joi.string().required()
    })
});
