<template>
    <div class='roller-view'>
        <div class="pretext-container">
            <p>Message goes here</p>
            <div class="input-container">
                <label for="code-input" style="margin-right: 5px;">Enter Code to Roll:</label>
                <input type="text" id="code-input"/>
                <button>Unlock</button>
            </div>
        </div>
        <div class="dice-groups-container">
            <DiceGroup :dice="dice"></DiceGroup>
            <DiceGroup></DiceGroup>
        </div>
    </div>
</template>

<script>
import DiceGroup from '../components/roller/DiceGroup.vue';

export default {
    components: {
        DiceGroup
    },
    data() {
        return {
            dice: [1, 2, 3]
        }
    }
}
</script>

<style scoped>
.roller-view {
    display: flex;
    flex-direction: column;
    width:75%;
    margin-right: auto;
    margin-left: auto;
    align-items:center;
}

.pretext-container {
    flex-direction: column;
    justify-content: left;
    align-content: left;
    width: 600px;
    margin-bottom: 30px;
}

.input-container {
    flex-direction: row;
}

.dice-groups-container {
    width: 600px;
}

.dice-groups-container > * {
    margin-top: 15px;
}
</style>