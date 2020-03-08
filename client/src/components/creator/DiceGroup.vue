<template>
    <div :id="id" class="dice-group">
        <div class="options-bar">
            <input 
                type="text" 
                class="options-bar-input"
                placeholder="Tag (Optional)"
                v-model="currentTag"
                @change="updateDiceGroup"
            />
            <div style="display: flex;">
                <button type="button">
                    <font-awesome-icon icon="cog"></font-awesome-icon>
                </button>
                <button 
                    type="button"
                    class="small-icon-button"
                    @click="resetDiceGroup"
                >
                    <font-awesome-icon icon="undo"></font-awesome-icon>
                </button>
                <button 
                    type="button"
                    class="small-icon-button"
                    @click="duplicateDiceGroup"
                >
                    <font-awesome-icon icon="clone"></font-awesome-icon>
                </button>
                <button 
                    type="button"
                    class="small-icon-button"
                    @click="deleteDiceGroup"
                >
                    <font-awesome-icon icon="times-circle"></font-awesome-icon>
                </button>
            </div>
        </div>
        <div class="dice-container">
            <div
                v-for="d in dice" 
                :key="d.id" 
                style="display: flex;"
            >
                <Dice 
                    :id="d.id"
                    :sides="d.sides"
                    :explode="d.explode"
                ></Dice>
                <div 
                    v-if="dice.indexOf(d) < dice.length - 1"
                    class="add-icon"
                >
                    <font-awesome-icon icon="plus"/>
                </div>
            </div>
            <button 
                type="button" 
                class="add-button"
                @click="addDice"
            >
                <font-awesome-icon icon="plus" class="fa-3x"/>
            </button>
        </div>
        <div class="options-bar">
            <input 
                type="text" 
                class="options-bar-input" 
                style="width: 75%"
                placeholder="Description (Optional)"
                v-model="currentDescription"
                @change="updateDiceGroup"
            />
        </div>
    </div>
</template>

<script>
import Dice from './Dice.vue'

export default {
    components: {
        Dice
    },
    props: {
        id: Number,
        tag: String,
        description: String,
        dice: Array
    },
    data() {
        return {
            currentTag: this.tag,
            currentDescription: this.description
        }
    },
    methods: {
        addDice() {
            this.$store.dispatch('creator/addDice', this.id);
        },
        deleteDiceGroup() {
            this.$store.dispatch('creator/removeDiceGroup', this.id);
        },
        duplicateDiceGroup() {
            this.$store.dispatch('creator/duplicateDiceGroup', this.id);
        },
        updateDiceGroup() {
            this.$store.dispatch('creator/updateDiceGroup', {
                id: this.id,
                tag: this.currentTag,
                description: this.currentDescription  
            });
        },
        resetDiceGroup() {
            this.$store.dispatch('creator/resetDiceGroup', this.id);
        }
    }
}
</script>

<style scoped>
.dice-group {
    display: flex;
    flex-direction: column;
    width: 600px;
    box-shadow: 0px 0px 20px #DCDCDC;
    border: solid 1px lightgrey;
}

.options-bar {
    height: 25px;
    background-color: black;
    display: flex;
    justify-content: space-between;
}

.options-bar > .options-bar-input {
    margin: 2px;
}

.dice-group > .dice-container {
    height: 100px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
}

.add-icon, .dice-group >>> .dice {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
}

.dice-group > .dice-container > .add-button {
    width: 50px;
    height: 50px;
    margin-left: 20px;
    margin-top: auto;
    margin-bottom: auto;
    flex-shrink: 0;
}

.small-icon-button {
    display: flex;
}
</style>