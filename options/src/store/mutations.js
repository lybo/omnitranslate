export default {
    populateVocabularyList(state, vocabularyList = []) {
        state.vocabularyList = vocabularyList;
    },
    addVocabulary(state, vocabulary) {
        state.vocabularyList.push(vocabulary);
    },
    addTranslation(state, { vocabularyId = null, translation = [] }) {
        if (!vocabularyId && !translation.length) {
            return;
        }

        const vocabulary = state.vocabularyList.find(x => x.id === vocabularyId);
        vocabulary && vocabulary.words.push(translation);
    },
};
