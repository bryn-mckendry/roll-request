<template>
    <div>
        <div id="app">
            <div class="logo-bar">
                Roll Request
            </div>
            <router-view></router-view>
            <div style="height: 50px">
            </div>
        </div>
    </div>
</template>

<script>

export default {
}
</script>

<style>
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
}

.logo-bar {
    background-color: black;
    top: 0;
    overflow: hidden;
    height: 50px;
    margin-bottom: 50px;
    color: white;
    text-align: center;
    font-size: 30px;
}
</style>