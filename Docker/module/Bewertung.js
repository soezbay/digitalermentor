const database = require('../config/database');
const Modul = require('../module/Modul');

class Bewertung {
    constructor(BewertungsID, BewertungsGruppe, BewertungsInhalt, ModulKuerzel, BenutzerID) {
        this.BewertungsID = BewertungsID;
        this.BewertungsGruppe = BewertungsGruppe;
        this.BewertungsInhalt = BewertungsInhalt;
        this.ModulKuerzel = ModulKuerzel;
        this.BenutzerID = BenutzerID;
    }

    async createBewertung() {
        let date = new Date();
        let yyyy = date.getFullYear();
        let mm = (date.getMonth() + 1).toString().padStart(2, '0');
        let dd = date.getDate().toString().padStart(2, '0');

        let ErstelltAM = `${yyyy}-${mm}-${dd}`;

        let sql = `INSERT INTO Bewertung (BewertungsGruppe, BewertungsInhalt, ErstelltAM, ModulKuerzel, BenutzerID) 
        VALUES ('${this.BewertungsGruppe}', ${this.BewertungsInhalt}, 
                '${ErstelltAM}', '${this.ModulKuerzel}', '${this.BenutzerID}')`;

        const [newBewertung, _] = await database.execute(sql);

        return newBewertung;
    }


    static findAll() {
        let sql = "Select * From Bewertung";

        return database.execute(sql);
    }
}
module.exports = Bewertung;