/**
 * Validation middleware for incoming JSON payloads from post requests.
 */
const Joi = require('@hapi/joi');


const createDiceSchema = Joi.object({
    sides: Joi.number().required(),
    explode: Joi.bool()
}).required();

const createDiceGroupOptionSchema = Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
    maxExecutions: Joi.number()
});

const createDiceGroupSchema = Joi.object({
    tag: Joi.string(),
    description: Joi.string(),
    modifier: Joi.number(),
    options: Joi.array().items(createDiceGroupOptionSchema),
    dice: Joi.array().items(createDiceSchema)
}).required();

const createRollSetSchema = Joi.object({
    message: Joi.string(),
    recipient: Joi.string().email().required(),
    sender: Joi.string().email().required(),
    diceGroups: Joi.array().items(createDiceGroupSchema)
});

const rollDiceSchema = Joi.object({
    rollSetId: Joi.string().required(),
    diceId: Joi.string().required(),
    diceGroupId: Joi.string().required()
});

const validateRequestAgainstSchema = schema => {
    return (req, res, next) => {
        try {
            Joi.assert(req.body, schema)
        } catch (err) {
            return res.json(err);
        }
        next();
    };
};

module.exports = {
    validateCreateRollRequest: validateRequestAgainstSchema(createRollSetSchema),
    validateRollDiceRequest: validateRequestAgainstSchema(rollDiceSchema)
}
