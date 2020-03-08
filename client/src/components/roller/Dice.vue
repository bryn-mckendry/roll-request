<template>
    <div class="dice">
        <button>
            {{ sides }}
        </button>
        <div>
            {{ result }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        sides: Number
    },
    data() {
        return {
            result: 0
        }
    }
}
</script>

<style scoped>

.dice {
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5px;
    margin-left: 5px;
}

</style>