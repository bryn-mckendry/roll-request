const { diceSchema } = require('./dice');
const diceGroupOptionExecutions = require('../utils/dice-group-options');
const mongoose = require('mongoose');

const schemaOptions = {
    toJSON: {
        virtuals: true,
    },
    id: false
}

/**
 * This schema provides additional options that can be applied to the dice
 * group. They are applied when the total for the dice group is calculated.
 * Options can be set so that they may only execute a certain number of times. 
 */
const diceGroupOptionSchema = mongoose.Schema({
    name: {
        type: String,
        enum: ['dropLowest', 'rerollLowest', 'dropHighest', 'rerollHighest']
    },
    value: {
        type: Number,
        required: true,
        min: 1
    },
    executedCount: {
        type: Number,
        default: 0
    },
    maxExecutions: {
        type: Number,
        default: 1,
        min: 1
    }
}, schemaOptions);

diceGroupOptionSchema.methods.applyTo = function(diceGroup) {
    if (this.executedCount < this.maxExecutions) {
        diceGroupOptionExecutions[this.name](diceGroup, this.value);
        this.executedCount++;
    }
}

/** 
 * Dice group schema for a grouping of dice. E.g. 4d6 would contain
 * 4 six sided dice that are rolled and their totals combined.
 * */ 
const diceGroupSchema = mongoose.Schema({
    tag: {
        type: String,
        maxlength: 80
    },
    description: {
        type: String,
        maxlength: 160
    },
    completedOn: Date,
    modifier: {
        type: Number,
        default: 0
    },
    dice: [diceSchema],
    options: [diceGroupOptionSchema]
}, schemaOptions)

// Virtual property that returns the total of all dice in the group.
// Also applies any options that might be on the dice group.
diceGroupSchema.virtual('total')
    .get(function() {
        return this.dice.reduce((acc, val) => { return acc + val.result }, 0);
    })

// A "completed" dice group is one that has no dice that can still be rolled.
diceGroupSchema.methods.checkCompletedStatus = function() {
    if (this.completedOn !== undefined) return true;
    for (var dice of this.dice) if (dice.rollsAllowed) return false;
    this.completedOn = Date.now();
    return true;
}

exports.DiceGroup = mongoose.model('DiceGroup', diceGroupSchema);
exports.diceGroupSchema = diceGroupSchema;