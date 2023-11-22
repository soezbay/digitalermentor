const database = require('../config/database');

class Benutzer{
    constructor(BenutzerID, Vorname, Nachname, Fachsemester,EMail, Passwort,Bild, Einstellung,Kuerzel, Credits) {
        this.BenutzerID = BenutzerID;
        this.Vorname = Vorname;
        this.Nachname = Nachname;
        this.Fachsemester = Fachsemester;
        this.EMail = EMail;
        this.Passwort = Passwort;
        this.Bild = Bild;
        this.Einstellung = Einstellung;
        this.Kuerzel = Kuerzel;
        this.Credits = Credits;
    }

static findAll(){
    let sql = "Select * From Benutzer;"
    return database.execute(sql);
}

static findUserByEmail(EMail) {
    let sql = `SELECT * FROM Benutzer WHERE EMail = '${EMail}';`;
    return database.execute(sql);
  }

}
module.exports = Benutzer;