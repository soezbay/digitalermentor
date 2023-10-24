import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            userData: [],
            termine: [],
            selectedDate: new Date(),
            goals: [],
            goals_ss: [],
            goals_ws: [],
            deletedGoals: [],
            checkedGoals: []
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

        addGoal(state, goal_data) {
            const newGoal = {
                id: goal_data.id,
                date: goal_data.date,
                titel: goal_data.titel,
                semesterSeason: goal_data.semesterSeason,
                info: goal_data.info
            }
            state.goals.push(newGoal);

            // Füge das Ziel sowohl zum zieleSS-Array als auch zum zieleWS-Array hinzu
            if (goal_data.semesterSeason === 'Sommersemester') {
                state.goals_ss.push(newGoal);
            } else if (goal_data.semesterSeason === 'Wintersemester') {
                state.goals_ws.push(newGoal);
            }
        },
        switchToWS(state, goal_ID) {
            const targetGoal = state.goals_ss.find(goal => goal.id === goal_ID);
            targetGoal.semesterSeason = 'Wintersemester';
            state.goals_ws.unshift(targetGoal);
            state.goals_ss = state.goals_ss.filter(goal => goal.id !== goal_ID);
        },
        switchToSS(state, goal_ID) {
            const targetGoal = state.goals_ws.find(goal => goal.id === goal_ID);
            targetGoal.semesterSeason = 'Sommersemester';
            state.goals_ss.unshift(targetGoal);
            state.goals_ws = state.goals_ws.filter(goal => goal.id !== goal_ID);
        },
        removeGoal(state, goal_ID) {
            const targetGoal = state.goals.find(goal => goal.id === goal_ID);
            state.deletedGoals.push(targetGoal);
            state.goals = state.goals.filter(goal => goal.id !== goal_ID);
            state.goals_ss = state.goals_ss.filter(goal => goal.id !== goal_ID);
            state.goals_ws = state.goals_ws.filter(goal => goal.id !== goal_ID);
            state.deletedGoals = state.deletedGoals.filter(goal => goal !== null && goal !== undefined);

        },
        removeGoalFinal(state, goal_ID) {
            state.deletedGoals = state.deletedGoals.filter(goal => goal.id !== goal_ID);
        },

        removeAllGoals(state) {
            console.log("lösche alle ziele")
            state.deletedGoals = [];
        },
        checkGoal(state, goal_ID) {
            const targetGoal = state.goals.find(goal => goal.id === goal_ID);
            state.checkedGoals.push(targetGoal);
            state.goals = state.goals.filter(goal => goal.id !== goal_ID);
            state.goals_ss = state.goals_ss.filter(goal => goal.id !== goal_ID);
            state.goals_ws = state.goals_ws.filter(goal => goal.id !== goal_ID);
            state.checkedGoals = state.checkedGoals.filter(goal => goal !== null && goal !== undefined);
        },
        updateGoalsOrderForWS(state, updatedGoals_ws) {
            state.goals_ws = updatedGoals_ws;
        },
        updateGoalsOrderForSS(state, updatedGoals_ss) {
            state.goals_ss = updatedGoals_ss;
        },
        restoreGoal(state, goal_ID) {
            const targetGoal = state.deletedGoals.find(goal => goal.id === goal_ID);
            if (targetGoal.semesterSeason === "Sommersemester") {
                state.goals.push(targetGoal);
                state.goals_ss.push(targetGoal);
                state.deletedGoals = state.deletedGoals.filter(goal => goal.id !== goal_ID);                
            } else {
                state.goals.push(targetGoal);
                state.goals_ws.push(targetGoal);
                state.deletedGoals = state.deletedGoals.filter(goal => goal.id !== goal_ID);
            }
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

        addGoal(context, goal_data) {
            context.commit('addGoal', goal_data);
        },
        deleteGoal(context, goal_ID) {
            context.commit('removeGoal', goal_ID);
        },
        deleteGoalFinal(context, goal_ID) {
            context.commit('removeGoalFinal', goal_ID);
        },
        deleteAllGoals(context) {
            context.commit('removeAllGoals');
        },
        restoreGoal(context, goal_ID) {
            context.commit('restoreGoal', goal_ID);
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

        getGoals_ss(state) {
            return state.goals_ss;
        },

        getGoals_ws(state) {
            return state.goals_ws;
        },

        getDeletedGoals(state) {
            return state.deletedGoals;
        }
    },

    plugins: [createPersistedState()]
});

export default store;