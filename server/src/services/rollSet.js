const { RollSet } = require('../models/rollSet');
const { generateKey } = require('../utils/key-gen');


/**
 * Creates a new RollSet document and saves it to the database.
 * 
 * @param {object} schemaMap - The RollSet model map containing keys and values
 */
exports.createRollSet = async function(schemaMap) {
    let rollSet = new RollSet(schemaMap);
    rollSet.accessKey = generateKey();
    await rollSet.save();
    return rollSet;
}

exports.rollDice = async function(rollSetId, diceGroupId, diceId) {
    return await RollSet.findById(rollSetId, (err, rollSet) => {
        if (err) return res.json(err);
        let diceGroup = rollSet.diceGroups.id(diceGroupId);
        let dice = diceGroup.dice.id(diceId);
        dice.roll();
        for (let option of diceGroup.options) option.applyTo(diceGroup);
        diceGroup.checkCompletedStatus();
        rollSet.checkCompletedStatus();
        rollSet.save();
        return rollSet;
    });
}