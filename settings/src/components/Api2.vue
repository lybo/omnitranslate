<template>
<div class="api">
    <div>
        <label>
            yandex key api
            <input type="text"
                   v-model="yandexKey"
                   ref="input"
                   :value="yandexKey" />
        </label>
        <button v-on:click="save">Save</button>
    </div>
</div>
</template>

<script>
const service = window.browser ? window.browser.storage.local : localStorage;

export default {
    name: 'api',
    data() {
        return {
            yandexKey: '',
        };
    },
    mounted: function mounted() {
        function setCurrentChoice(result) {
            this.yandexKey = result.yandex || '';
        }

        function onError() {
        }
        if (window.browser) {
            const getting = service.get('yandex');
            getting.then(setCurrentChoice, onError);
        } else {
            const data = JSON.parse(service.getItem('yandex'));
            this.yandexKey = data.yandex;
        }
    },
    methods: {
        save: function save() {
            const yandex = this.$refs.input.value;
            this.yandexKey = yandex;
            if (window.browser) {
                service.set({
                    yandex: this.yandexKey,
                });
            } else {
                service.setItem('yandex', JSON.stringify({
                    yandex,
                }));
            }
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

