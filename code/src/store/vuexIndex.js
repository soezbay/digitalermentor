import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            userData: [],
            termine: [],
            selectedDate: new Date(),
            goals: [],
            restoreGoals: [],
            goals_ss: [],
            goals_ws: [],
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

            if (goalData.semesterSeason === 'Sommersemester') {
                state.goals_ss.push(newGoal);
            } else if (goalData.semesterSeason === 'Wintersemester') {
                state.goals_ws.push(newGoal);
            }

            

        },

        removeGoal(state, goal_ID) {
            const targetGoal = state.goals.find(goal => goal.id === goal_ID);
            state.deletedGoals.push(targetGoal);
            state.goals = state.goals.filter(goal => goal.id !== goal_ID);
            state.goals_ss = state.goals_ss.filter(goal => goal.id !== goal_ID);
            state.goals_ws = state.goals_ws.filter(goal => goal.id !== goal_ID);

        },
        removeGoalFinal(state, goal_Id) {
            state.deletedGoals = state.deletedGoals.filter(goal => goal.id !== goal_Id);
        },

        removeAllGoals(state) {
            console.log("lösche alle ziele")
            state.deletedGoals = [];
        },

        updateGoalsOrderForSS(state, updatedGoals) {
            state.goals_ss = updatedGoals;
        },
        updateGoalsOrderForWS(state, updatedGoals) {
            state.goals_ws = updatedGoals;
        },

        updateGoals_ws(state, updatedGoals_ws) {
            const filteredGoals = updatedGoals_ws.filter(goal => goal !== null && goal !== undefined);
            state.goals_ws = filteredGoals;
        },
        updateGoals_ss(state, updatedGoals_ss) {
            const filteredGoals = updatedGoals_ss.filter(goal => goal !== null && goal !== undefined);
            state.goals_ss = filteredGoals;
        },
        updateGoals(state, updatedGoals) {
            console.log("update...");
            // const filteredGoals = updatedGoals.filter(goal => goal !== null && goal !== undefined);
            // state.goals = filteredGoals;
            state.goals = updatedGoals;
            console.log("updated!!!!!!");
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

        deleteAllGoals() {
            this.state.goals = [];
            this.state.goals_ws = [];
            this.state.goals_ss = [];
        },

        updateGoalsAction(context, updatedGoals) {
            console.log(context, updatedGoals);
            context.commit('updateGoals', updatedGoals);
        }
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
        getRestoredGoals(state) {
            return state.restoreGoals;
        },
        getGoals_ss(state) {
            return state.goals_ss;
        },
        getGoals_ws(state) {
            return state.goals_ws;
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