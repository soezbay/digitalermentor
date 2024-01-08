const Modul = require('../module/Modul');

const convertUmlauteToUtf8 = (data) => {
    if (typeof data === 'string') {
        return Buffer.from(data, 'latin1').toString('utf-8');
    } else if (Array.isArray(data)) {
        return data.map(item => convertUmlauteToUtf8(item));
    } else if (typeof data === 'object' && data !== null) {
        const newObj = {};
        Object.keys(data).forEach(key => {
            newObj[key] = convertUmlauteToUtf8(data[key]);
        });
        return newObj;
    }
    return data;
};

exports.getAlleModule = async (req, res, next) => {
    try {
        const [module, _] = await Modul.findAll();
        const moduleWithUtf8 = module.map(item => convertUmlauteToUtf8(item));
        res.status(200).json({ module: moduleWithUtf8 });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getAlleBewertungenVonModul = async (req, res, next) => {
    try {
        let modul1 = req.params.Modul;
        const [modulBewertungen, _] = await Modul.findAllBewertungenFromModul(modul1);

        const modulBewertungenWithUtf8 = modulBewertungen.map(item => convertUmlauteToUtf8(item));

        res.status(200).json({ modulBewertungen: modulBewertungenWithUtf8 });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getModul = async (req, res, next) => {
    try {
        let modul1 = req.params.Modul;
        let studiengang = req.params.Studiengang;
        const [modul, _] = await Modul.findModul(modul1, studiengang);

        res.status(200).json({ modul: convertUmlauteToUtf8(modul) });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getModuleMitStatus = async (req, res, next) => {
    try {
        let BenutzerID = req.params.BenutzerID;
        const [modul, _] = await Modul.findModuleMitStatus(BenutzerID);
        res.status(200).json({ modul: convertUmlauteToUtf8(modul) });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getModulVoraussetzungen = async (req, res, next) => {
    try {
        let modul1 = req.params.Modul;
        const [modulPflicht, _1] = await Modul.getModulVoraussetzungenPflicht(modul1);
        const [modulEmpfohlen, _2] = await Modul.getModulVoraussetzungenPflicht(modul1);
        res.status(200).json({ modulPflicht: convertUmlauteToUtf8(modulPflicht), modulEmpfohlen: convertUmlauteToUtf8(modulEmpfohlen) });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
