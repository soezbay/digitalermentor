const database = require('../config/database');

class Studiengang {
    constructor(Kuerzel, Name,Standort, Abschlussart, Regelstudienzeit, Studienbeginn) {
        this.Kuerzel = Kuerzel;
        this.Name = Name;
        this.Standort = Standort;
        this.Abschlussart = Abschlussart;
        this. Regelstudienzeit = Regelstudienzeit;
        this.Studienbeginn = Studienbeginn;

    }

    static findAll() {
        let sql = "Select * From Studiengang";

        return database.execute(sql);
    }

    static findAllPflichtModuleFromStudiengang(StudiengangKuerzel) {
        let sql = `Select * From Modul Inner Join Pflicht On Pflicht.ModulKuerzel = Modul.Kuerzel where Pflicht.StudiengangKuerzel = '${StudiengangKuerzel}';`;
       
        return database.execute(sql);
    }

    static findAllWahlpflichtModuleFromStudiengang(StudiengangKuerzel) {
        let sql = `Select * From Modul Inner Join Wahlpflicht On Wahlpflicht.ModulKuerzel = Modul.Kuerzel where Wahlpflicht.StudiengangKuerzel = '${StudiengangKuerzel}';`;

        return database.execute(sql);
    }

    static findALLModuleFromStudiengang(Studiengang) {
        
    }
}
module.exports = Studiengang;