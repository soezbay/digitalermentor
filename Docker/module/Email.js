const database = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Email{
    constructor( EmailInhalt, BenutzerID ) {
        this.EmailID = uuidv4();
        this.EmailInhalt = EmailInhalt;
        this.BenutzerID = BenutzerID;
    }

    static getAllEmailsfromBenutzer(BenutzerID){
        let sql = `Select * From BenutzerEmail where BenutzerID = '${BenutzerID }';`;
        return database.execute(sql);
    }

    async addEmails() {
        
        let sql = `Insert into BenutzerEmail values(
            '${this.EmailID}',
            '${this.EmailInhalt}',
            '${this.BenutzerID}'
        )`;
        const [newEmail, _] = await database.execute(sql);
    
        return newEmail;
    }

    static deleteEmail(EmailID) {
        let sql = `DELETE FROM BenutzerEmail WHERE EmailID = '${EmailID}';`;
    
        return database.execute(sql);
    }
}

module.exports = Email;
