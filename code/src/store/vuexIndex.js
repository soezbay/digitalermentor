import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            userData: [],
            termine: [],
            selectedDate: new Date(),
            goals: [],
            deletedGoals: [],
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
        },

        addGoal(state, goalData) {
            const newGoal= {
                id: goalData.id,
                titel: goalData.titel,
                semesterSeason: goalData.semesterSeason,
                info: goalData.info
            }
            state.goals.push(newGoal);
        },

        removeGoal(state, goal_Id) {
            const targetGoal = state.goals.find(goal => goal.id === goal_Id);
            state.deletedGoals.push(targetGoal );
            state.goals = state.goals.filter(goal => goal.id !== goal_Id);
        },
        removeGoalFinal(state, goal_Id) {
            state.deletedGoals = state.deletedGoals.filter(goal => goal.id !== goal_Id);
        },

        removeAllGoals(state) {
            console.log("lösche alle ziele")
            state.deletedGoals = [];
        },

        // updateZieleOrderForSS(state, updatedZiele) {
        //     state.zieleSS = updatedZiele;
        // },
        // updateZieleOrderForWS(state, updatedZiele) {
        //     state.zieleWS = updatedZiele;
        // },

        // updateZieleWSOrder(state, updatedZieleWS) {
        //     state.zieleWS = updatedZieleWS;
        // },
        // updateZieleSSOrder(state, updatedZieleSS) {
        //     state.zieleSS = updatedZieleSS;
        // },
        updateGoals(state, updatedGoals) {
            state.goals = updatedGoals;
        },

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
        },

        addGoal(context, goalData) {
            context.commit('addGoal', goalData);
        },
        deleteGoal(context, goal_id) {
            context.commit('removeGoal', goal_id);
        },
        deleteGoalFinal(context, goal_id) {
            context.commit('removeGoalFinal', goal_id);
        },
        deleteAlldeletedGoals(context) {
            context.commit('removeAllGoals');
        },
    },

    getters: {
        userData(state) {
            return state.userData;
        },

        termine(state) {
            return state.termine;
        },

        termin(state) {
            return (terminId) => {
                return state.termine.find(termin => termin.id === terminId);
            };
        },

        termin: (state) => (id) => {
            return state.termine.find((termin) => termin.id === id);
        },

        getSelectedDate(state) {
            return state.selectedDate;
        },

        getGoals(state) {
            return state.goals;
        },

        getGoal: (state) => (id) => {
            return state.goals.find((goal) => goal.id === id);
        },

        getDeletedGoals(state) {
            return state.deletedGoals;
        }
    },

    plugins: [createPersistedState()]
});

export default store;