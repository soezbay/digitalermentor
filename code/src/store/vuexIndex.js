import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';


const store = createStore({
    state() {
        return {
            userData: [],
            termine: [],
            selectedDate: new Date(),

            ziele: [],
            zieleSS: [],
            zieleWS: [],
            deletedZiele: [],

            studentID: "test123",
            obligatoryModules: [],
            electiveModules: [],
            studentProgress: [],
            

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

        addZiel(state, zielData) {
            const newZiel = {
                id: zielData.id,
                titel: zielData.titel,
                semesterSeason: zielData.semesterSeason,
                beschreibung: zielData.beschreibung
            }
            state.ziele.push(newZiel);

            // Füge das Ziel sowohl zum zieleSS-Array als auch zum zieleWS-Array hinzu
            if (zielData.semesterSeason === 'Sommersemester') {
                state.zieleSS.push(newZiel);
            } else if (zielData.semesterSeason === 'Wintersemester') {
                state.zieleWS.push(newZiel);
            }
        },
        removeZiel(state, zielId) {
            const targetZiel = state.ziele.find(ziel => ziel.id === zielId);
            state.deletedZiele.push(targetZiel);
            state.ziele = state.ziele.filter(ziel => ziel.id !== zielId);
            state.zieleSS = state.zieleSS.filter(ziel => ziel.id !== zielId);
            state.zieleWS = state.zieleWS.filter(ziel => ziel.id !== zielId);
        },
        // updateZieleOrderForSS(state, updatedZiele) {
        //     state.zieleSS = updatedZiele;
        // },
        // updateZieleOrderForWS(state, updatedZiele) {
        //     state.zieleWS = updatedZiele;
        // },
        updateZieleWSOrder(state, updatedZieleWS) {
            state.zieleWS = updatedZieleWS;
        },
        updateZieleSSOrder(state, updatedZieleSS) {
            state.zieleSS = updatedZieleSS;
        },

        setObligatoryModules(state, obligatoryModules) {
            state.obligatoryModules = obligatoryModules;
        },
        setStudentProgress(state, studentProgress) {
            state.studentProgress = studentProgress;
        },
        setElectiveModules(state, electiveModules) {
            state.electiveModules = electiveModules;
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

        addZiel(context, zielData) {
            context.commit('addZiel', zielData);
        },

        deleteZiel(context, zielId) {
            context.commit('removeZiel', zielId);
        },

        async fetchData({ commit }) {
            console.log('--Synchronisiere Daten--');
            try {
                // const [obligatoryModules, electiveModules, studentProgress] = await Promise.all([
                    const [obligatoryModules, electiveModules] = await Promise.all([
                    axios.get('http://localhost:8000/studiengang/pflicht/pi'),
                    axios.get('http://localhost:8000/studiengang/wahlpflicht/pi'),
                    // axios.get(`http://localhost:8000/modul/status/${this.studentID}`)

                ]);

                const studentProgressResponse = await axios.get(`http://localhost:8000/modul/status/${this.state.studentID}`);
                const studentProgress = studentProgressResponse.data.modul;

                commit('setObligatoryModules', obligatoryModules.data.pflicht);
                commit('setElectiveModules', electiveModules.data.wahlpflicht);
                commit('setStudentProgress', studentProgress);

                console.log('Daten erfolgreich im State: \n', this.state.obligatoryModules, this.state.electiveModules);
                console.log('Modulstatus \n', this.state.studentProgress);
                console.log('--Erfolgreich Synchronisiert--');
            } catch (error) {
                console.error('Fehler beim Laden der Daten:', error);
            }
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

        ziele(state) {
            return state.ziele;
        },
        ziel: (state) => (id) => {
            return state.ziele.find((ziel) => ziel.id === id);
        },
        zieleSS(state) {
            return state.zieleSS;
        },
        zieleWS(state) {
            return state.zieleWS;
        },
        deletedZiele(state) {
            return state.deletedZiele;
        },

        getObligatoryModules(state) {
            return state.obligatoryModules;
        },
        getElectiveModules(state) {
            return state.electiveModules;
        },
        getStudentProgress(state) {
            return state.studentProgress;
        },
    },

    plugins: [createPersistedState()]
});

export default store;