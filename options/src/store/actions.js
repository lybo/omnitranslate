import { getData } from '../services/index';
export default {
    fetchVocabularies({ commit }) {
        getData()
            .then(data => {
                console.log('data', data.vocabularyList);
                commit('populateVocabularyList', data.vocabularyList);
            })
            .catch(console.error);
    },
    addVocabulary({ commit }, vocabularyData) {
        const langs = `${vocabularyData.langs[0]}-${vocabularyData.langs[1]}`;
        const unixTimestamp = new Date().getTime();
        const vocabulary = {
            ...vocabularyData,
            id: `${vocabularyData.url}-${langs}-${unixTimestamp}`,
        };

        const lala = commit('addVocabulary', vocabulary);
        console.log(lala);
        // setData()
        //     .then(data => {
        //     })
        //     .catch(console.error);
    },
    addTranslation({ commit }, data) {
        commit('addTranslation', data);
        // setData()
        //     .then(data => {
        //     })
        //     .catch(console.error);
    },
}
