import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

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
            checkedGoals: [],
            moduleOverviewData: [],
            TestDaten: {
                BenutzerID: 'Test123',
            },
            letzterCacheUpdate: new Date(0)
        }
    },
    mutations: {
        async createCacheAPI(state) {
            try {
                console.info('Erhaltener JSON-String1:', JSON.stringify(state));
                const requestData = {
                  BenutzerID: state.TestDaten.BenutzerID,
                  CacheDaten: JSON.stringify(state),
                };
                await axios.post('http://localhost:8000/cache/', requestData);
                console.log('Daten wurden erfolgreich erstellt.');
                console.info('createCacheAPI wurde ausgeführt');
              } catch (error) {
                console.error('Fehler beim Erstellen der API-Daten:', error);
                throw error;
              }
        },
        async updateAPI(state) {
            try {
                
                console.info('Erhaltener JSON-String:', JSON.stringify(state));
                state.letzterCacheUpdate = new Date();
                const updatedData = {
                    BenutzerID: state.TestDaten.BenutzerID,
                    CacheDaten: JSON.stringify(state),
                  };
                await axios.put(`http://localhost:8000/cache/`, updatedData);
                
                console.log('Daten wurden erfolgreich aktualisiert.');
            } catch (error) {
                console.error('Fehler beim Aktualisieren der API-Daten:', error);
                throw error; 
            }
        },

        setAPIData(state, data) {
            Object.assign(state, data);
            console.info('setAPIData wurde ausgeführt');
            console.info(state)
        },

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
            state.checkedGoals = state.checkedGoals.filter(goal => goal.id !== goal_ID )
        },

        removeAllGoals(state) {
            console.log("lösche alle ziele")
            state.deletedGoals = [];
        },
        removeAllCompletedGoals(state) {
            console.log("lösche alle Erreichten ziele")
            state.checkedGoals = [];
        },
        checkGoal(state, goal_ID) {
            const targetGoal = state.goals.find(goal => goal.id === goal_ID);
            state.checkedGoals.push(targetGoal);
            state.goals = state.goals.filter(goal => goal.id !== goal_ID);
            state.goals_ss = state.goals_ss.filter(goal => goal.id !== goal_ID);
            state.goals_ws = state.goals_ws.filter(goal => goal.id !== goal_ID);
            state.checkedGoals = state.checkedGoals.filter(goal => goal !== null && goal !== undefined);
        },
        // updateGoalsOrderForWS(state, updatedGoals_ws) {
        //     state.goals_ws = updatedGoals_ws;
        // },
        // updateGoalsOrderForSS(state, updatedGoals_ss) {
        //     state.goals_ss = updatedGoals_ss;
        // },
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
        restoreCheckedGoal(state, goal_ID) {
            const targetGoal = state.checkedGoals.find(goal => goal.id === goal_ID);
            if (targetGoal.semesterSeason === "Sommersemester") {
                state.goals.push(targetGoal);
                state.goals_ss.push(targetGoal);
                state.checkedGoals = state.checkedGoals.filter(goal => goal.id !== goal_ID);                
            } else {
                state.goals.push(targetGoal);
                state.goals_ws.push(targetGoal);
                state.checkedGoals = state.checkedGoals.filter(goal => goal.id !== goal_ID);
            }
        },
        saveSettingsModuleOverview(state, lastSettings) {
            console.log("Last Settings:")
            console.log(lastSettings);
            state.moduleOverviewData = lastSettings;
        }


    },

    actions: {
        async fetchCacheFromAPI(context) {
            try {
                const BenutzerID = context.state.TestDaten.BenutzerID;
                const localCacheDate = new Date(context.state.letzterCacheUpdate);
                let APICacheDate = new Date(0);
                try {
                    const response = await axios.get(`http://localhost:8000/cache/Timestamp/${BenutzerID}`);
                    const apiData = response.data;
                    const apiDateString = apiData.TimeStamp[0].Datum;           
                    APICacheDate = new Date(apiDateString);
                } catch (error) {
                    console.error('Fehler beim Abrufen des Zeitstempels von der API:', error);
                }
                const letzerCacheUpdateTimestamp = APICacheDate.getTime();
                const localCacheTime = localCacheDate.getTime();

                if (localCacheTime < letzerCacheUpdateTimestamp) {
                // Überprüfen, ob bereits ein Cache-Eintrag vorhanden ist
                const response = await axios.get('http://localhost:8000/cache/' + BenutzerID);
                const data = response.data;
                
                if (data.Daten.length === 0) {
                    context.commit('createCacheAPI');
                } else {
                    const innerJsonString = data.Daten[0].CacheDaten;
                    try {
                        const cachedData = JSON.parse(innerJsonString);
                        console.info("Cache geupdated");
                        context.commit('setAPIData', cachedData);
                    } catch (error) {
                        console.log('Fehler beim Parsen von JSON:', error, innerJsonString);
                    }
                }
            }
            } catch (error) {
                console.error('Fehler beim Abrufen des Caches von der API:', error);
            }
        },
        async saveSelectedDate({ commit }, date) {
            commit('setSelectedDate', date);
            commit('updateAPI',context);
        },

        async addTermin(context, terminData) {
            context.commit('addTermin', terminData);
            context.commit('updateAPI',context);
        },

        async updateTermin({ commit }, updatedTermin) {
            commit('updateTermin', updatedTermin);
            commit('updateAPI',context);
        },

        async deleteTermin(context, terminId) {
            context.commit('removeTermin', terminId);
            context.commit('updateAPI',context);
        },

        async addGoal(context, goal_data) {
            console.log(context.state);
            context.commit('addGoal', goal_data);
            context.commit('updateAPI');
        },
        async deleteGoal(context, goal_ID) {
            context.commit('removeGoal', goal_ID);
            context.commit('updateAPI',context);
        },
        async deleteGoalFinal(context, goal_ID) {
            context.commit('removeGoalFinal', goal_ID);
            context.commit('updateAPI',context);
        },
        async deleteAllGoals(context) {
            context.commit('removeAllGoals');
            context.commit('updateAPI',context);
        },
        async deleteAllCompletedGoals(context) {
            context.commit('removeAllCompletedGoals');
            context.commit('updateAPI',context);
        },
        async restoreGoal(context, goal_ID) {
            context.commit('restoreGoal', goal_ID);
            context.commit('updateAPI',context);
        },
        async switchToWS(context,goal_ID) {
            context.commit('switchToWS',goal_ID);
            context.commit('updateAPI',context);
        },
        async switchToSS(context,goal_ID) {
            context.commit('switchToSS',goal_ID);
            context.commit('updateAPI',context);
        },
        async checkGoal(context, goal_ID) {
            context.commit('checkGoal', goal_ID);
            context.commit('updateAPI',context);
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
        },
        getCheckedGoals(state) {
            return state.checkedGoals;
        },
        getModuleOverviewData(state) {
            return state.moduleOverviewData;
        },
        getLetzerCacheUpdate(state) {
            return state.letzterCacheUpdate;
        }
    },
    setters:{
    },

    plugins: [createPersistedState()]
});

store.dispatch('fetchCacheFromAPI');

export default store;