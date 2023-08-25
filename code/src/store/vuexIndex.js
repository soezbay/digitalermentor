import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            termine: [
                {
                    id: 't1',
                    titel: 'App programmieren',
                    datum: '22. Januar 2023',
                    zeit: '16:00 Uhr',
                    ort: 'kein ort',
                    beschreibung: 'keine beschreibung'
                },
                {
                    id: 't2',
                    titel: 'Kollegen treffen',
                    datum: '24. Januar 2023',
                    zeit: '12:00 Uhr',
                    ort: 'kein ort',
                    beschreibung: 'keine beschreibung'
                }
            ],

            selectedDate: null,

        }
    },

    mutations: {
        setSelectedDate(state, date) {
            state.selectedDate = date;
        }
    },

    actions: {
        saveSelectedDate({ commit }, date) {
            commit('setSelectedDate', date);
        }
    },

    getters: {
        termine(state) {
            return state.termine;
        },
        
        termin(state) {
            return (terminId) => {
                return state.termine.find(termin => termin.id === terminId);
            };
        },

        getSelectedDate(state) {
            return state.selectedDate;
        },
    }
});

export default store;