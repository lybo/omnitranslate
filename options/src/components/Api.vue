<template>
<div class="api">
    <inputApi apiName="yandex"></inputApi>
    <inputApi apiName="google"></inputApi>
</div>
</template>

<script>
import InputApi from './InputApi.vue';

export default {
    name: 'api',
    components: {
        InputApi,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

