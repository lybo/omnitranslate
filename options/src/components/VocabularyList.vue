<template>
<div class="vocabulary">
    <ul class="vocabulary__list" v-for="vocabulary in list">
        <li class="vocabulary__list-item">
            <a :href="vocabulary.url" class="vocabulary__list-title">
                {{vocabulary.title}}
            </a>

            <ul class="vocabulary__langs">
                <li class="vocabulary__lang" v-for="lang in vocabulary.langs">
                    {{lang}}
                </li>
            </ul>

            <ul class="vocabulary__translations">
                <li class="vocabulary__translation" v-for="item in vocabulary.words">
                    <div class="vocabulary__word" v-for="word in item.translation">
                        {{ word }}
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'VocabularyList',
    computed: {
        list() {
            return this.$store.getters.vocabularyList;
        },
    },
    methods: {
        traslationArray: function (traslation) {
            return [
                traslation[this.langs[0]],
                traslation[this.langs[1]],
            ];
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.vocabulary {
    &__list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        &-item {

        }
    }

    &__langs {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    &__lang {
        flex: 1 1 auto;
    }

    &__translations {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
    }

    &__translation {
        display: flex;
        flex: 1 1 auto;
    }

    &__word {
        flex: 1 1 auto;
    }
}
</style>
