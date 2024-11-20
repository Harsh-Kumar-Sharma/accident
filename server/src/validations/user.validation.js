const Joi = require('@hapi/joi');
const { create } = require('@hapi/joi/lib/ref');

const createUser = {
  body: Joi.object().keys({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().required(),
    mobile:Joi.string().required(),
    roleId:Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  createUser,
  updateUser,
};
