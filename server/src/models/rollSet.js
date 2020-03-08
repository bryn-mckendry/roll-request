const mongoose = require('mongoose');
const { diceGroupSchema } = require('./diceGroup');

const schemaOptions = {
    toJSON: {
        versionKey: false
    }
}

const rollSetSchema = mongoose.Schema({
    message: {
        type: String,
        maxlength: 400
    },
    diceGroups: {
        type: [diceGroupSchema],
        required: true
    },
    completedOn: Date,
    accessKey: String
}, schemaOptions);

rollSetSchema.virtual('urlHash')
    .get(function() {
        return JSON.stringify(this._id);
    })

rollSetSchema.methods.checkCompletedStatus = function() {
    if (this.completedOn !== undefined) return true;
    for (var diceGroup of this.diceGroups) if (!diceGroup.checkCompletedStatus()) return false;
    this.completedOn = Date.now();
    return true;
}

const RollSet = mongoose.model('RollSet', rollSetSchema);

exports.RollSet = RollSet;