<template>
    <div class="creator-view">
        <div class="container">
            <div class="text-container">
                <b>Send a roll request!</b>
                <p>
                    Enter your email, your name and the recipient's email below.
                    You can also add an optional message if you want! Then start 
                    adding some dice groups. You can control how many dice you 
                    want in each group.
                </p>
            </div>
            <div class="communication-container">
                <div class="email-container">
                    <label for="sender-email">Your Email</label>
                    <input 
                        type="email"
                        id="sender-email"
                        v-model="sender"
                        @change="updateSender"
                    />
                    <label for="recipient-email">Recipient Email</label>
                    <input 
                        type="email"
                        id="recipient-email"
                        v-model="recipient"
                        @change="updateRecipient"
                    />
                    <button 
                        type="button"
                        style="margin-top: 5px;"
                        @click="send"
                    >Send</button>
                </div>
                <div class="message-container">
                    <label for="message">Message</label>
                    <textarea 
                        id="message" 
                        style="flex-grow: 1"
                        v-model="message"
                        @change="updateMessage"
                    />
                </div>
            </div>
            <div class="dice-group-container">
                <div
                    v-for="dg in diceGroups"
                    :key="dg.id"
                >
                    <DiceGroup
                        :id="dg.id"
                        :dice="dg.dice"
                        :tag="dg.tag"
                        :description="dg.description"
                        style="margin-bottom: 20px;"
                    />
                </div>
                <button 
                    type="button"
                    class="add-dice-group-button"
                    @click="addDiceGroup"
                >
                    <font-awesome-icon icon="plus"></font-awesome-icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import DiceGroup from '../components/creator/DiceGroup.vue';

export default {
    components: {
        DiceGroup
    },
    data() {
        return {
            message: "",
            sender: "",
            recipient: ""
        }
    },
    computed: {
        diceGroups: function() {
            return this.$store.state.creator.diceGroups;
        }
    },
    methods: {
        updateMessage() {
            this.$store.dispatch('creator/updateMessage', this.message);
        },
        updateSender() {
            this.$store.dispatch('creator/updateSender', this.sender);
        },
        updateRecipient() {
            this.$store.dispatch('creator/updateRecipient', this.recipient);
        },
        addDiceGroup() {
            this.$store.dispatch('creator/addDiceGroup');
        },
        send() {
            this.$store.dispatch('creator/sendRollSet');
        }
    }
}
</script>

<style scoped>
.creator-view {
    display: flex;
    justify-content: center;
    align-items: center;
}

.creator-view > .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
}

.creator-view > .container > .text-container {
    display: flex;
    flex-direction: column;
    max-width: 70%;
    margin-bottom: 20px;
}

.creator-view > .container > .communication-container {
    display: flex;
    flex-direction: row;
    width: 50%;
    font-size: 14px;
    height: 130px;
    margin-bottom: 20px;
}

.creator-view > .container > .communication-container > .email-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-right: 20px;
    justify-content: space-between;
}

.creator-view > .container > .communication-container > .message-container {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
}

.creator-view > .container > .dice-group-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.creator-view > .add-dice-group-button {
    margin-top: 15px;
    margin-bottom: 25px;
}
</style>