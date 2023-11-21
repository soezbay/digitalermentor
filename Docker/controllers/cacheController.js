const Cache = require('../module/Cache');

exports.getCache = async (req, res, next) => {
    try {
        let BenutzerID = req.params.BenutzerID;
        const [Daten, _] = await Cache.getCache(BenutzerID);
        res.status(200).json({ Daten });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getLastUpdateTime = async (req, res, next) => {
    try {
        let BenutzerID = req.params.BenutzerID;
        const [TimeStamp, _] = await Cache.getLastUpdate(BenutzerID);
        res.status(200).json({ TimeStamp });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createNewCache = async (req, res, next) => {
    try {
        let { BenutzerID, CacheDaten } = req.body;
        let cache = new Cache(BenutzerID, CacheDaten);

        post = await cache.addCache();

        res.send("Create new Cache Route.");
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteCache1 = async (req, res, next) => {
    try {
        let BenutzerID = req.params.BenutzerID;
        const [Daten, _] = await Cache.deleteCache(BenutzerID);
        res.status(200).json({ Daten });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateCache = async (req, res, next) => {
        try {
            let { BenutzerID, CacheDaten } = req.body;
            let cache = new Cache(BenutzerID, CacheDaten);
    
            post = await cache.updateCache();
    
            res.send("Create new Cache Route.");
        } catch (error) {
            console.log(error);
            next(error);
        }
};
