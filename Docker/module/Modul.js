const database = require('../config/database');

class Modul {
    constructor(Kuerzel, Name, Verantwortlicher, Dozent, Sprache, Turnus, Leistungspunkte, Arbeitsaufwand, Teilnehmerzahl, VoraussetzungenPflicht, VoraussetzungenEmpfohlen, Pruefungsleistung, Lernergebnisse, Inhalt, Extrakurse) {
        this.Kuerzel = Kuerzel;
        this.Name = Name;
        this.Verantwortlicher = Verantwortlicher;
        this.Dozent = Dozent;
        this.Sprache = Sprache;
        this.Turnus = Turnus;
        this.Leistungspunkte = Leistungspunkte;
        this.Arbeitsaufwand = Arbeitsaufwand;
        this.Teilnehmerzahl = Teilnehmerzahl;
        this.VoraussetzungenPflicht = VoraussetzungenPflicht;
        this.VoraussetzungenEmpfohlen = VoraussetzungenEmpfohlen;
        this.Pruefungsleistung = Pruefungsleistung;
        this.Lernergebnisse = Lernergebnisse;
        this.Inhalt = Inhalt;
        this.Extrakurse = Extrakurse;

    }

    static findAll() {
        let sql = "Select * From Modul;";

        return database.execute(sql);
    }

    static findAllBewertungenFromModul(ModulKuerzel) {
        let sql = `Select * From Bewertung where Kuerzel= '${ModulKuerzel}';`;

        return database.execute(sql);
    }

    static findModul(ModulKuerzel, StudiengangKuerzel) {
        let sql = `Select * From Modul LEFT JOIN Pflicht ON Pflicht.ModulKuerzel = Modul.Kuerzel LEFT JOIN Wahlpflicht ON Wahlpflicht.ModulKuerzel = Modul.Kuerzel where (Pflicht.StudiengangKuerzel = '${StudiengangKuerzel}' OR Wahlpflicht.StudiengangKuerzel = '${StudiengangKuerzel}') and Modul.Kuerzel = '${ModulKuerzel}';`;

        return database.execute(sql);
    }
}
module.exports = Modul;