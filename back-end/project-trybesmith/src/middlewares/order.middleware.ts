import Joi from 'joi';

export default Joi.object({
  productsIds: Joi
    .array()
    .items(Joi.number())
    .min(1)
    .required()
    .messages({
      'array.min': '"productsIds" must include only numbers',
    }),
});