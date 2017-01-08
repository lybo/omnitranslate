<template>
<div id="app">
    <img src="./assets/logo.png">
    <api></api>
    <VocabularyList></VocabularyList>
</div>
</template>

<script>
import Api from './components/Api.vue';
import VocabularyList from './components/VocabularyList.vue';

export default {
    name: 'app',
    components: {
        Api,
        VocabularyList,
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
