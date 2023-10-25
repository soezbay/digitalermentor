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

    static findModuleMitStatus(BenutzerID) {
        let sql = `SELECT Modul.Kuerzel, Modul.Name, Note.Note, Note.Status
        FROM Modul
        Left JOIN Pruefung ON Pruefung.Kuerzel = Modul.Kuerzel
        LEFT JOIN Note ON Pruefung.PruefungsID = Note.PruefungsID
        WHERE Note.BenutzerID = '${BenutzerID}';
        `;

        return database.execute(sql);
    }

    static getModulVoraussetzungenPflicht(ModulKuerzel) {
        let sql = `SELECT Modul.Name, Modul.Kuerzel
        FROM Modul
        JOIN VoraussetzungenPflicht ON Modul.Kuerzel = VoraussetzungenPflicht.VoraussetzungModulKuerzel
        WHERE VoraussetzungenPflicht.ModulKuerzel = '${ModulKuerzel}';
        `;

        return database.execute(sql);
    }

    static getModulVoraussetzungenEmpfohlen(ModulKuerzel) {
        let sql = `SELECT Modul.Name, Modul.Kuerzel
        FROM Modul
        JOIN VoraussetzungenEmpfohlen ON Modul.Kuerzel = VoraussetzungenEmpfohlen.VoraussetzungModulKuerzel
        WHERE VoraussetzungenEmpfohlen.ModulKuerzel = '${ModulKuerzel}';
        `;

        console.log("SQL Query:", sql); // Protokollierung der SQL-Anweisung

        return database.execute(sql);
    }
}

module.exports = Modul;