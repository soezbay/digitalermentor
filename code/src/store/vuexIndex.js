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
            courses: [],
            obligatoryModules: [],
            electiveModules: [],
            TestDaten: {
                BenutzerID: 'Test123',
            }
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
                updateAPI();
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
            state.checkedGoals = state.checkedGoals.filter(goal => goal.id !== goal_ID)
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
        },

        pushFetchedCourses(state, fetchedCourses) {
            if (fetchedCourses) {
                state.courses = fetchedCourses;
                console.log("Courses: ", state.courses);
            } else {
                console.log("Konnte keine Kurse fetchen!");
            }
        },
        commitFetchedObligatoryModules(state, fetchedModules) {
            if (fetchedModules) {
                state.obligatoryModules = fetchedModules;
                console.log("Courses: ", state.courses);
            } else {
                console.log("Konnte keine Kurse fetchen!");
            }
        },
        commitFetchedElectiveModules(state, fetchedModules) {
            if (fetchedModules) {
                state.electiveModules = fetchedModules;
                console.log("Courses: ", state.courses);
            } else {
                console.log("Konnte keine Kurse fetchen!");
            }
        }
    },

    actions: {
        async fetchCoursesData(context) {

            let courses = '';
            try {
                const response = await axios.get('http://localhost:8000/studiengang');
                courses = response.data.studiengaenge;
            } catch (error) {
                console.error('Error fetching studiengaenge:', error);
            }

            context.commit('pushFetchedCourses', courses);
        },

        async fetchCourseModuleData(context, course) {
       
            try {
                const response = await fetch(`http://localhost:8000/studiengang/pflicht/${course}`);
                const data = await response.json();
                console.log(data);

                // Überprüfen Sie, ob die Daten in der Antwort vorhanden sind
                if (data.pflicht) {
                    const obligatoryModules = data.pflicht;
                    console.log("Pflichtmodule geladen:", obligatoryModules);
                    context.commit('commitFetchedObligatoryModules', obligatoryModules);
                } else {
                    console.error("Fehler beim Laden der Pflichtmodule.");
                }
            } catch (error) {
                console.error("Fehler beim Abrufen der Daten:", error);
            }

            try {
                const response = await axios.get(`http://localhost:8000/studiengang/wahlpflicht/${course}`);
                const data = await response.data;
                if (data.wahlpflicht) {
                    const electiveModules = data.wahlpflicht;
                    console.log("Wahlplichtmodule geladen:", this.modules.wahlpflicht);
                    context.commit('commitFetchedElectiveModules', electiveModules);
                } else {
                    console.error("Fehler beim Laden der Wahlpflichtflichtmodule.");
                }
            } catch (error) {
                console.error("Fehler beim Abrufen der Daten:", error);
            }

        },

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
        },
        getCheckedGoals(state) {
            return state.checkedGoals;
        },
        getModuleOverviewData(state) {
            return state.moduleOverviewData;
        }
    },
    functions: {
        async getLastUpdateTime() {
            try {
                const response = await axios.get(`/cache/Timestamp/${this.BenutzerID}`);
                return response.data.TimeStamp;
            } catch (error) {
                console.error('Fehler beim Abrufen des letzten Aktualisierungszeitpunkts:', error);
                return 0;
            }
        }
    },
    methods: {
        async checkAndUpdateCache() {
            try {
                const jetztigeZeit = new Date().getTime();
                const letzerCacheUpdate = getLastUpdateTime().getTime();

                if (jetztigeZeit < letzerCacheUpdate) {

                    this.state = this.getAPIData();
                    console.log('Cache wurde aktualisiert.');
                } else {
                    console.log('Cache ist noch aktuell.');
                }
            } catch (error) {
                console.error('Fehler beim Aktualisieren des Caches:', error);
            }
        },

        async getAPIData() {
            const response = await fetch(`http://localhost:8000/cache/${this.TestDaten.BenutzerID}`);
            const data = await response.json();
            const cacheDatenString = data.Daten.CacheDaten;
            const cacheDatenObjekt = JSON.parse(cacheDatenString);
            return cacheDatenObjekt;
        },

        async updateAPI() {
            try {
                const updatedData = this.state;
                await axios.put(`localhost:8000/cache/`, updatedData);
                console.log('Daten wurden erfolgreich aktualisiert.');
            } catch (error) {
                console.error('Fehler beim Aktualisieren der API-Daten:', error);
                throw error;
            }
        },

        async createCacheAPI() {
            try {
                const updatedData = this.state;
                await axios.post(`localhost:8000/cache/`, updatedData);
                console.log('Daten wurden erfolgreich erstellt.');
            } catch (error) {
                console.error('Fehler beim Erstellen der API-Daten:', error);
                throw error;
            }
        }
    },

    plugins: [createPersistedState()]
});

export default store;