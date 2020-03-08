const RollSetService = require('../services/rollSet');
const MailingService = require('../services/mailing');


exports.createRollRequest = async (req, res) => {
    try {
        let rollSet = await RollSetService.createRollSet(req.body);
        if (req.body.recipient) {
            MailingService.emailRollSetURL(rollSet, req.body.recipient);
        }
        res.status(201).json(rollSet);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.rollDice = async (req, res) => {
    try {
        let rollSet = RollSetService.rollDice(req.params.rollSetId, req.body.diceGroupId, req.body.diceId)
        return res.status(200).json(rollSet);
    } catch (err) {
        return res.status(500).json(err);
    }
}