const database = require('../config/database');
const Modul = require('./Modul');

class Cache {
    constructor(BenutzerID, CacheDaten, Datum) {
        this.BenutzerID = BenutzerID;
        this.CacheDaten = CacheDaten;
        this.Datum = Datum;
    }

    async addCache() {
        
        let date = new Date(this.Datum);
        let yyyy = date.getFullYear();
        let mm = (date.getMonth() + 1).toString().padStart(2, '0');
        let dd = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');

        let Datum = `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;


        let sql = `Insert into BenutzerCache values(
            '${this.BenutzerID}',
            '${this.CacheDaten}',
            '${Datum}'
        )`;
        const [newChache, _] = await database.execute(sql);
    
        return newChache;
    }

    async updateCache() {
        let date = new Date(this.Datum);
        let yyyy = date.getFullYear();
        let mm = (date.getMonth() + 1).toString().padStart(2, '0');
        let dd = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');

        let Datum = `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;

        let sql = `UPDATE BenutzerCache
        SET CacheDaten = '${this.CacheDaten}',
            Datum = '${Datum}'
        WHERE BenutzerID = '${this.BenutzerID}';`;
        const [newCache, _] = await database.execute(sql);
        return newCache;
    }

    static deleteCache(BenutzerID) {
        let sql = `DELETE FROM BenutzerCache WHERE BenutzerID = '${BenutzerID}';`;
    
        return database.execute(sql);
    }
    
    static getCache(BenutzerID) {
        let sql = `SELECT CacheDaten FROM BenutzerCache Where BenutzerID = '${BenutzerID}' ;`;

        return database.execute(sql);
    }

    static getLastUpdate(BenutzerID) {
        let sql = `Select Datum From BenutzerCache Where BenutzerID = '${BenutzerID}' ;`;

        return database.execute(sql);
    }


}
module.exports = Cache;