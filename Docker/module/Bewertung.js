const database = require('../config/database.js');
const { v4: uuidv4 } = require('uuid');

class Bewertung {
    constructor( BewertungSterne, Feedback, Schwierigkeitsgrad, Arbeitsaufwand, Lernhilfe, SemsterAnzeigen, ModulKuerzel, BenutzerID) {
        console.log("Im Constructor: " + Lernhilfe)
        this.BewertungID = uuidv4();
        this.BewertungSterne = BewertungSterne;
        this.Feedback = Feedback;
        this.Schwierigkeitsgrad = Schwierigkeitsgrad;
        this.Arbeitsaufwand = Arbeitsaufwand;
        this.Lernhilfe = Lernhilfe;
        this.SemsterAnzeigen = SemsterAnzeigen;
        this.ModulKuerzel = ModulKuerzel;
        this.BenutzerID = BenutzerID;
    }


    async createBewertung() {
        let date = new Date();
        let yyyy = date.getFullYear();
        let mm = (date.getMonth() + 1).toString().padStart(2, '0');
        let dd = date.getDate().toString().padStart(2, '0');

        let ErstelltAM = `${yyyy}-${mm}-${dd}`;

        console.log("Lernhife:" + this.Lernhilfe)

        let sql = `INSERT INTO Bewertung VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
         return database.execute(sql, [
            this.BewertungID,
            this.BewertungSterne,
            this.Feedback,
            this.Schwierigkeitsgrad,
            this.Arbeitsaufwand,
            this.Lernhilfe,
            this.SemsterAnzeigen,
            ErstelltAM,
            this.ModulKuerzel,
            this.BenutzerID
        ]);
    }



    static findAll() {
        let sql = "Select * From Bewertung";

        return database.execute(sql);
    }

    static findBewertungenVonModul(Modul) {
        let sql = `Select * From Bewertung WHERE Kuerzel = '${Modul}'`

        return database.execute(sql);
    }
}
module.exports = Bewertung;