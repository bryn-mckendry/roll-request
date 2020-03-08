<template>
    <div :id="id" class="dice">
        <div class="dice-options">
            <button 
                type="button"
                @click="toggleExplode"
            >
                <font-awesome-icon icon="bomb"></font-awesome-icon>
            </button>
            <button 
                type="button"
                @click="duplicateDice"
            >
                <font-awesome-icon icon="clone"></font-awesome-icon>
            </button>
            <button 
                type="button"
                @click="deleteDice"
            >
                <font-awesome-icon icon="times-circle"></font-awesome-icon>
            </button>
        </div>
        <input
            type="number"
            class="sides-input"
            v-model="currentSides"
            @change="changeSides"
        />
    </div>
</template>

<script>
export default {
    props: {
        id: Number,
        sides: Number,
        explode: Boolean
    },
    data() {
        return {
            currentSides: this.sides
        }
    },
    methods: {
        changeSides() {
            this.$store.dispatch('creator/changeDiceSides', {
                id: this.id,
                sides: this.currentSides
            })
        },
        deleteDice() {
            this.$store.dispatch('creator/removeDice', this.id);
        },
        duplicateDice() {
            this.$store.dispatch('creator/duplicateDice', this.id);
        },
        toggleExplode() {
            this.$store.dispatch('creator/toggleDiceExplode', this.id);
        }
    }
}
</script>

<style scoped>
.dice {
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    flex-shrink: 0;
}

.dice > .dice-options {
    display: flex;
    justify-content: space-between;
}

.dice > .dice-options > button {
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 3px;
}

.dice > .sides-input {
    width: 30px;
    height: 30px;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>