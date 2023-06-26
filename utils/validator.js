const Joi = require('joi');

const registerValidation = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  });
  return schema.validate(body);
};

module.exports = {
  registerValidation,
};
