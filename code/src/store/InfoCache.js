import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

const info = createStore({
    state() {
        return {
            pflichtmodulue: [],
            wahlpfichtmodulue: [],
            studiengaenge: [],
            TestDaten: {
                BenutzerID: 'Test123',
            },
            letzterCacheUpdate: new Date()
        }
    },
    mutations: {
        addModul(state, data) {
            const newModul = {

                Kuerzel :  data.Kuerzel,
                Name :  data.Name,
                Verantwortlicher : data.Verantwortlicher,
                Dozent :  data.Dozent,
                Sprache :  data.Sprache,
                Turnus : data.Turnus,
                Leistungspunkte : data.Leistungspunkte,
                Arbeitsaufwand : data.Arbeitsaufwand,
                Teilnehmerzahl : data.Teilnehmerzahl,
                VoraussetzungenPflicht : data.VoraussetzungenPflicht,
                VoraussetzungenEmpfohlen : data.VoraussetzungenEmpfohlen,
                Pruefungsleistung : data.Pruefungsleistung,
                Lernergebnisse : data.Lernergebnisse,
                Inhalt : data.Inhalt,
                Extrakurse : data.Extrakurse

            }
            state.modulue.push(newModul);
        },
    },
    actions:{
        async addModul(context, data) {
            console.log(context.state);
            context.commit('addGoal', data);
        },
    },
       
    getters: {
        moduluebersicht(state) {
            return state.moduluebersicht;
        },
    },
    setters:{
    },

    plugins: [createPersistedState()]
});

export default info;