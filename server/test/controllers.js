const assert = require('chai').assert;
const { createRollRequest, rollDice, getRollRequest } = require('../src/controllers/rollSet');
const config = require('../src/config');

config.TESTING();

const rollRequest = {
    diceGroups: [
        {
            tag: "test"
        }
    ]
}

describe('RollSetController', function() {
    describe('createRollRequest', function() {
        it('should generate access key', function() {
            
        });
    });
});