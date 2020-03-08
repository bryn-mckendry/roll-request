/* Vuex Module for the creation of roll sets. */
import axios from 'axios';

/**
 * Helper function to get the index of an element inside
 * an array by its id property.
 * 
 * @param {Array} array - The array containing the element.
 * @param {Number} id - The id of the target element.
 */
let getIndexById = (array, id) => {
    return array.indexOf(
        array.find(x => { return x.id === id })
    );
}

/**
 * The Vuex module
 */
const creatorModule = {
    namespaced: true,
    state: {
        diceGroupId: 1,
        diceId: 1,
        sender: "",
        recipient: "",
        message: "",
        diceGroups: [{
            id: 0,
            tag: "",
            description: "",
            dice: [{
                id: 0,
                sides: 4,
                explode: false
            }]
        }]
    },
    mutations: {
        // Roll Set Mutations
        updateSender(state, sender) {
            state.sender = sender;
        },
        updateRecipient(state, recipient) {
            state.recipient = recipient;
        },
        updateMessage(state, message) {
            state.message = message;
        },

        // Dice Group Mutations
        addDiceGroup(state, diceGroup) {
            state.diceGroups.push(diceGroup);
        },
        removeDiceGroup(state, index) {
            state.diceGroups.splice(index, 1);
        },
        updateDiceGroup(state, payload) {
            state.diceGroups[payload.index].tag = payload.tag;
            state.diceGroups[payload.index].description = payload.description;
        },
        resetDiceGroup(state, index) {
            state.diceGroups[index].tag = "";
            state.diceGroups[index].description = "";
            state.diceGroups[index].dice.splice(1);
            state.diceGroups[index].dice[0].sides = 4;
            state.diceGroups[index].dice[0].explode = false;
        },
        incrementDiceGroupId(state) {
            state.diceGroupId++;
        },

        // Dice Mutations
        addDice(state, payload) {
            state.diceGroups[payload.diceGroupIndex].dice.push(payload.dice);
        },
        changeDiceSides(state, payload) {
            state.diceGroups[payload.diceGroupIndex].dice[payload.diceIndex].sides = payload.sides;
        },
        setExplode(state, payload) {
            state.diceGroups[payload.diceGroupIndex].dice[payload.diceIndex].explode = payload.explode;
        },
        removeDice(state, payload) {
            state.diceGroups[payload.diceGroupIndex].dice.splice(payload.diceIndex, 1);
        },
        incrementDiceId(state) {
            state.diceId++;
        }
    },
    actions: {
        updateMessage(context, message) {
            context.commit('updateMessage', message);
        },
        updateSender(context, sender) {
            context.commit('updateSender', sender);
        },
        updateRecipient(context, recipient) {
            context.commit('updateRecipient', recipient);
        },
        sendRollSet(context) {
            let diceGroups = []
            for (let diceGroup of context.state.diceGroups) {
                let dice = [];
                for (let d of diceGroup.dice) {
                    dice.push({
                        sides: d.sides,
                        explode: d.explode
                    })
                }
                diceGroups.push({
                    tag: diceGroup.tag,
                    description: diceGroup.description,
                    dice: dice
                })
            }
            let payload = {
                message: context.state.message,
                recipient: context.state.recipient,
                sender: context.state.sender,
                diceGroups: diceGroups
            }
            axios.post('http://127.0.0.1:5000/', payload)
                .then(resp => console.log(resp))
                .catch(err => {console.log(err)})
        },
        // Dice Group Actions
        addDiceGroup(context) {
            context.commit('addDiceGroup', {
                id: context.state.diceGroupId,
                tag: "",
                description: "",
                dice: [{
                    id: context.state.diceId,
                    sides: 4,
                    explode: false
                }]
            })
            context.commit('incrementDiceId');
            context.commit('incrementDiceGroupId');
        },
        removeDiceGroup(context, diceGroupId) {
            let diceGroupIndex = getIndexById(context.state.diceGroups, diceGroupId);
            context.commit('removeDiceGroup', diceGroupIndex);
        },
        duplicateDiceGroup(context, diceGroupId) {
            let diceGroupIndex = getIndexById(context.state.diceGroups, diceGroupId);
            let diceGroup = context.state.diceGroups[diceGroupIndex];
            let dice = []
            for (let d of diceGroup.dice) {
                dice.push({
                    id: context.state.diceId,
                    sides: d.sides,
                    explode: d.explode
                });
                context.commit('incrementDiceId');
            }
            context.commit('addDiceGroup', {
                id: context.state.diceGroupId,
                tag: diceGroup.tag,
                description: diceGroup.description,
                dice: dice
            })
            context.commit('incrementDiceGroupId');
        },
        updateDiceGroup(context, diceGroup) {
            // first need to find index by diceGroup id
            let diceGroupIndex = getIndexById(context.state.diceGroups, diceGroup.id);
            // index, tag, description needed to commit
            context.commit('updateDiceGroup', { 
                index: diceGroupIndex,
                tag: diceGroup.tag,
                description: diceGroup.description
            })
        },
        resetDiceGroup(context, diceGroupId) {
            let diceGroupIndex = getIndexById(context.state.diceGroups, diceGroupId);
            context.commit('resetDiceGroup', diceGroupIndex);
        },

        // Dice Actions
        addDice(context, diceGroupId) {
            let diceGroupIndex = getIndexById(context.state.diceGroups, diceGroupId); 
            let dice = {
                id: context.state.diceId,
                sides: 4,
                explode: false
            }
            context.commit('addDice', { diceGroupIndex, dice });
            context.commit('incrementDiceId')
        },
        removeDice(context, diceId) {
            for (let diceGroup of context.state.diceGroups) {
                let diceIndex = getIndexById(diceGroup.dice, diceId);
                if (diceIndex !== -1) {
                    let diceGroupIndex = context.state.diceGroups.indexOf(diceGroup);
                    context.commit('removeDice', {
                        diceGroupIndex: diceGroupIndex,
                        diceIndex: diceIndex
                    })
                    break;
                }
            }
        },
        duplicateDice(context, diceId) {
            for (let diceGroup of context.state.diceGroups) {
                let diceIndex = getIndexById(diceGroup.dice, diceId);
                if (diceIndex !== -1) {
                    let diceGroupIndex = context.state.diceGroups.indexOf(diceGroup);
                    let diceToCopy = context.state.diceGroups[diceGroupIndex].dice[diceIndex]; 
                    let dice = {
                        id: context.state.diceId,
                        sides: diceToCopy.sides,
                        explode: diceToCopy.explode
                    }
                    context.commit('addDice', { diceGroupIndex, dice });
                    context.commit('incrementDiceId');
                    break;
                }
            }
        },
        changeDiceSides(context, dice) {
            for (let diceGroup of context.state.diceGroups) {
                let diceIndex = getIndexById(diceGroup.dice, dice.id);
                if (diceIndex !== -1) {
                    let diceGroupIndex = context.state.diceGroups.indexOf(diceGroup);
                    context.commit('changeDiceSides', {
                        diceGroupIndex: diceGroupIndex,
                        diceIndex: diceIndex,
                        sides: parseInt(dice.sides)
                    })
                    break;
                }
            }
        },
        toggleDiceExplode(context, diceId) {
            for (let diceGroup of context.state.diceGroups) {
                let diceIndex = getIndexById(diceGroup.dice, diceId);
                if (diceIndex !== -1) {
                    let diceGroupIndex = context.state.diceGroups.indexOf(diceGroup);
                    let explode = false;
                    if (context.state.diceGroups[diceGroupIndex].dice[diceIndex].explode === false) {
                        explode = true;
                    }
                    context.commit('setExplode', {
                        diceGroupIndex: diceGroupIndex,
                        diceIndex: diceIndex,
                        explode: explode
                    })
                    break;
                }
            }
        }
    }
}

export default creatorModule;