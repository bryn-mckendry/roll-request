/**
 * Express middlewares
 */
module.exports = {
    validateCreateRollRequest: require('./json-validation').validateCreateRollRequest,
    validateRollDiceRequest: require('./json-validation').validateRollDiceRequest,
    verifySMTPConnection: require('./smtp-verification').verifySMTPConnection
}