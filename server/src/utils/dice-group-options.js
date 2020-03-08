exports.dropLowest = function(diceGroup, stopIndex) {
    diceGroup.dice.slice(0, stopIndex)
}

exports.dropHighest = function(diceGroup, stopIndex) {
    diceGroup.dice.slice(stopIndex);
}

exports.rerollLowest = function(diceGroup, stopIndex) {
    diceGroup.dice.slice(0, stopIndex).forEach(d => { d.rollsAllowed = true; });
}

exports.rerollHighest = function(diceGroup, stopIndex) {
    diceGroup.dice.slice(stopIndex).forEach(d => { d.rollsAllowed =true; });
}