const Bewertung = require('../module/Bewertung');
const Modul = require('../module/Modul');

exports.getAlleModule = async (req, res, next) => {
    try{
        const [module, _] = await Modul.findAll();

        res.status(200).json({module});
    }catch (error) {
       console.log(error);
        next(error);
    }
};

exports.getAlleBewertungenVonModul = async (req, res, next) => {
    try{
        let modul1 = req.params.Modul;
        const [modulBewertungen, _] = await Modul.findAllBewertungenFromModul(modul1);

        res.status(200).json({modulBewertungen});
    }catch (error) {
       console.log(error);
        next(error);
    }
};