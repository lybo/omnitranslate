<template>
<div id="app">
    <img src="./assets/logo.png">
    <api></api>
</div>
</template>

<script>
import Api from './components/Api';

export default {
    name: 'app',
    components: {
        Api,
    },
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
