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
const service = window.browser ? window.browser.storage.local : localStorage;

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
        function setCurrentChoice(result) {
            this.key = result[this.apiName] || '';
        }

        function onError() {
        }
        if (window.browser) {
            const getting = service.get(this.apiName);
            getting.then(setCurrentChoice, onError);
        } else {
            const data = JSON.parse(service.getItem('omnitraslate'));
            this.key = data ? data[this.apiName] : '';
        }
    },
    methods: {
        save: function save() {
            const key = this.$refs.input.value;
            this.key = key;
            if (window.browser) {
                service.set({
                    yandex: this.key,
                });
            } else {
                const data = JSON.parse(service.getItem('omnitraslate')) || {};
                data[this.apiName] = key;
                service.setItem('omnitraslate', JSON.stringify(data));
            }
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

