const mongoose = require('mongoose');

/**
 * Schema for the roll results. Just has the value that was rolled
 * and the time it was rolled at. This schema does not have an _id
 * property as it's not really needed.
 */
const resultSchema = new mongoose.Schema({
        value: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
            required: true
        }
    },
    // Schema options
    { 
        _id: false 
    }
)


/**
 * Schema options for the diceSchema below. Including virtuals
 * in the JSON / Object responses so that result will be included.
 */
const schemaOptions = {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    id: false
}

const diceSchema = new mongoose.Schema({
    sides: {
        type: Number,
        min: [1, 'Dice must have at least one side'],
        max: [100, 'Only support dice with 100 sides'],
        required: true
    },
    explode: {
        type: Boolean,
        default: false
    },
    rollsAllowed: {
        type: Boolean,
        default: true
    },
    rolls: [resultSchema]
}, schemaOptions)


/**
 * Virtual property that returns the 'result' of the dice rolls.
 * 
 * If the dice is set to explode, it will return the sum of 
 * all rolls, otherwise it will return the result of the last dice roll.
 * 
 * If this value is set, it will only assign the value if rollsAllowed is
 * set to true. In this case, the value will be pushed onto the rolls array
 */

diceSchema.virtual('result')
    .get(function() {
        if (this.rolls.length === 0) return 0;
        else if (this.explode) {
            return this.rolls.reduce((total, curr) => {
                return total.value += curr.value;
            });
        }
        else return this.rolls[this.rolls.length - 1].value;
    })
    .set(function(v) {
        if (this.rollsAllowed === false) return;
        this.rolls.push({ value: v });
        this.rollsAllowed = (this.explode && v === this.sides) ? true : false;
    })

/**
 * Rolls the dice, sets the result to a value between 1 and the dice's total
 * sides.
 */
diceSchema.methods.roll = function() {
    var roll = Math.ceil(Math.random() * Math.floor(this.sides));
    this.result = roll;
    return roll;
}

const Dice = mongoose.model('Dice', diceSchema);

exports.Dice = Dice
exports.diceSchema = diceSchema 