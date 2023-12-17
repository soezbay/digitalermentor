const database = require('../config/database');
const Modul = require('../module/Modul');

class Bewertung {
    constructor(ModulKuerzel, BenutzerID, SemsterAnzeigen, Schwierigkeitsgrad,  Arbeitsaufwand,  Lernhilfe,  PersoenlichesFeedback, Gesamtbewertung) {
        this.BewertungID;
        this.ModulKuerzel = ModulKuerzel;
        this.BenutzerID = BenutzerID;
        this.SemsterAnzeigen = SemsterAnzeigen;
        this.Schwierigkeitsgrad = Schwierigkeitsgrad;
        this.Arbeitsaufwand = Arbeitsaufwand;
        this.Lernhilfe = Lernhilfe;
        this.PersoenlichesFeedback = PersoenlichesFeedback;
        this.Gesamtbewertung = Gesamtbewertung;
    }

    async createBewertung() {
        let date = new Date();
        let yyyy = date.getFullYear();
        let mm = (date.getMonth() + 1).toString().padStart(2, '0');
        let dd = date.getDate().toString().padStart(2, '0');

        let ErstelltAM = `${yyyy}-${mm}-${dd}`;

        let sql = `
        INSERT INTO Bewertung 
        (ModulKuerzel, BenutzerID, SemsterAnzeigen, Schwierigkeitsgrad, Arbeitsaufwand, Lernhilfe, PersoenlichesFeedback, Gesamtbewertung, ErstelltAM) 
        VALUES 
        (
            '${this.ModulKuerzel}', 
            '${this.BenutzerID}', 
            ${this.SemsterAnzeigen}, 
            ${this.Schwierigkeitsgrad}, 
            ${this.Arbeitsaufwand}, 
            ${this.Lernhilfe}, 
            ${this.PersoenlichesFeedback}, 
            ${this.Gesamtbewertung}, 
            '${ErstelltAM}'
        )`;

        const [newBewertung, _] = await database.execute(sql);

        return newBewertung;
    }


    static findAll() {
        let sql = "Select * From Bewertung";

        return database.execute(sql);
    }
}
module.exports = Bewertung;