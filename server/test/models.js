const assert = require('chai').assert;
const { Dice } = require('../src/models/dice');
const { DiceGroup } = require('../src/models/diceGroup');

describe('Dice', function() {

    describe('result', function() {
        it('should return result after setting result to a value just once.', function() {
            let dice = new Dice({ sides: 4 });
            dice.result = 4;
            assert.equal(dice.result, 4);
        });

        it('should return cumulative total if dice is set to explode and first result equals sides', function() {
                let dice = new Dice({ sides: 4, explode: true });
                dice.result = 4;
                dice.result = 3;
                assert.equal(dice.result, 7);
        });
    });

    describe('#roll()', function() {
        it('should never be always be between 1 and dice sides', function() {
            let dice = new Dice({ sides: 4 });
            let withinRange = true;
            for (var i = 0; i < 1000; i++) {
                let roll = dice.roll();
                if (roll < 1 || roll > dice.sides) withinRange = false;
            }
            assert.isTrue(withinRange);
        })
    });
});

describe('DiceGroup', function() {

    describe('total', function() {
        it('should return the sum of dice rolls.', function() {
            let diceGroup = new DiceGroup({
                dice: [{ sides: 4 }, { sides: 4 }]
            });
            diceGroup.dice[0].result = 3;
            diceGroup.dice[1].result = 4;
            assert.equal(diceGroup.total, 7);
        });
    });

    // Test applyTo on dice group options
    // Test completedOn
});

describe('RollSet', function() {
    //
})

