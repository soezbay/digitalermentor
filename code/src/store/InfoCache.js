import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

const info = createStore({
    state() {
        return {
            pflichtmodulue: {
                studiengang: "",
                module: [],
            },
            wahlpfichtmodulue: [],
            studiengaenge: [],
            TestDatenInfo: {
                BenutzerID: 'Test123',
            },
            letzterCacheUpdateInfo: new Date()
        }
    },
    plugins: [
        createPersistedState({
          key: 'info'
        })
      ],
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
        setpflichtmodule(state, data) {
            state.pflichtmodulue.Studiengang = data.studiengang;
            state.pflichtmodulue = data.modulue;
        }
    },

    plugins: [createPersistedState()]
});

export default info;