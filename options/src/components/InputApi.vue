<template>
<div class="api">
    <div>
        <label>
            {{apiName}} key api
            <input type="text"
                   v-model="key"
                   ref="input"
                   :value="key" />
        </label>
        <button v-on:click="save">Save</button>
    </div>
</div>
</template>

<script>
import { getData, updateData } from '../services/index';

export default {
    name: 'inputApi',
    props: {
        apiName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            key: '',
        };
    },
    mounted: function mounted() {
        getData()
            .then(data => {
                this.key = data[this.apiName]
            })
            .catch(console.error);
    },
    methods: {
        save: function save() {
            const key = this.$refs.input.value;
            this.key = key;
            updateData(this.apiName, key);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

