import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            termine: [],
            selectedDate: new Date(),
        }
    },

    mutations: {
        setSelectedDate(state, date) {
            state.selectedDate = date;
        },

        addTermin(state, terminData) {
            const newTermin = {
                id: terminData.enteredDatum + " " + terminData.enteredZeit,
                titel: terminData.enteredTitel,
                datum: terminData.enteredDatum,
                zeit: terminData.enteredZeit,
                ort: terminData.enteredOrt,
                beschreibung: terminData.enteredBeschreibung
            }
            console.log(newTermin);
            state.termine.push(newTermin);
            state.termine.sort((a, b) => {
                const dateA = new Date(`${a.datum} ${a.zeit}`);
                const dateB = new Date(`${b.datum} ${b.zeit}`);
                return dateA - dateB;
            });
        },

        updateTermin(state, updatedTermin) {
            const index = state.termine.findIndex((termin) => termin.id === updatedTermin.id);
            if (index !== -1) {
              // Wenn der Termin gefunden wurde, aktualisieren Sie ihn
              state.termine[index] = updatedTermin;
            }
          },

        removeTermin(state, terminId) {
            state.termine = state.termine.filter(termin => termin.id !== terminId);
        }

    },

    actions: {
        saveSelectedDate({ commit }, date) {
            commit('setSelectedDate', date);
        },

        addTermin(context, terminData) {
            context.commit('addTermin', terminData);
        },

        updateTermin({ commit }, updatedTermin) {
            commit('updateTermin', updatedTermin);
          },

        deleteTermin(context, terminId) {
            context.commit('removeTermin', terminId);
        }
    },

    getters: {
        termine(state) {
            return state.termine;
        },

        termin(state) {
            return (terminId) => {
                return state.termine.find(termin =>  termin.id === terminId);
            };
        },

        termin: (state) => (id) => {
            return state.termine.find((termin) => termin.id === id);
          },

        getSelectedDate(state) {
            return state.selectedDate;
        },
    },

    plugins: [createPersistedState()]
});

export default store;