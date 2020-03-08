<template>
    <div class="dice-group">
        <div class="upper-container">
            <div class="name-container">
                dice group name goes here
            </div>
            <div class="info-container">
                info here.
            </div>
        </div>
        <div class="lower-container">
            <div class="dice-container">
                <div v-for="d in dice" :key="d.id">
                    <Dice :sides='2'></Dice>
                </div>
            </div>
            <div class="total-container">
                total
            </div>
        </div>
    </div>
</template>

<script>
import Dice from '../roller/Dice.vue';

export default {
    props: {
        dice: Array
    },
    components: {
        Dice
    }
}
</script>

<style scoped>
.dice-group {
    display: flex;
    flex-direction:column;
    width: 600px;
    height: 100px;
    border: black 1px solid;
}

.lower-container {
    display:flex;
    flex-direction: row;
    padding: 5px;
    flex-grow: 1;
}

.upper-container {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid;
    flex-direction: row;
    justify-content: space-between;
}

.name-container {

}

.info-container {

}

.dice-container {
    border-right: 1px solid black;
    display: flex;
    flex: 5;
    align-items: center;
}

.total-container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>