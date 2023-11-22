const database = require('../config/database');

class User {
  constructor(BenutzerID, Vorname, Nachname, Fachsemester, EMail, Passwort, Bild, Einstellung, Kuerzel, Credits) {
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

  static findAll() {
    if (database && database.execute) {
      let sql = "select * From Benutzer;";
      return database.execute(sql);
    } else {
      return Promise.reject(new Error('Database execute method not available'));
    }
  }


  static findUserByID(BenutzerID) {
    let sql = `SELECT * FROM Benutzer WHERE BenutzerID = '${BenutzerID}';`;
    return database.execute(sql);
  }

  // Ajoutez d'autres méthodes statiques selon vos besoins...

}

module.exports = User;
