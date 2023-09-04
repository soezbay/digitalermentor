const database = require('../config/database');

class ModulZiel {
    constructor(ZielID, Titel, Semester, BenutzerID, Kuerzel) {
        this.ZielID = ZielID;
        this.Titel = Titel;
        this.Semester = Semester;
        this.BenutzerID = BenutzerID;
        this.Kuerzel = Kuerzel;
    }

    async createZiel() {
            const insertZielSql = 'INSERT INTO Ziel (ZielID, Titel, BenutzerID) VALUES (?, ?, ?)';
            const insertModulZielSql = 'INSERT INTO ModulZiel (ZielID, Titel, Semester, BenutzerID, Kuerzel) VALUES (?, ?, ?, ?, ?)';
        
            const insertZielValues = [this.ZielID, this.Titel, this.BenutzerID];
            const insertModulZielValues = [this.ZielID, this.Titel, this.Semester, this.BenutzerID, this.Kuerzel];
        
            try {
                await database.execute(insertZielSql, insertZielValues);
                const [newZiel, _] = await database.execute(insertModulZielSql, insertModulZielValues);
                return newZiel;
            } catch (error) {
                throw error;
            }
        
    }

    static findAllFromBenutzer(BenutzerID) {
        let sql = `SELECT * FROM ModulZiel WHERE BenutzerID = '${BenutzerID}'`;
        return database.execute(sql);
    }

    async deleteZiel(BenutzerID) {
        let sql = `DELETE FROM ModulZiel WHERE ZielID = '${this.ZielID}' AND BenutzerID = '${BenutzerID}'`;
        return database.execute(sql);
    }
}

module.exports = ModulZiel;