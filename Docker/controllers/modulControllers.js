const Modul = require('../module/Modul');

exports.getAlleModule = async (req, res, next) => {
    try{
        const [module, _] = await Modul.findAll();
        console.info();
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
}
exports.getModul = async (req, res, next) => {
       try{
            let modul1 = req.params.Modul;
            let studiengang = req.params.Studiengang;
            const [modul, _] = await Modul.findModul(modul1, studiengang);

          //  console.log("Received modul:", modul); // Fügen Sie diese Zeile hinzu

            res.status(200).json({modul});
        }catch (error) {
           console.log(error);
            next(error);
        }
};

exports.getModuleMitStatus = async (req, res, next) => {
    try{
         let BenutzerID	 = req.params.BenutzerID;
         const [modul, _] = await Modul.findModuleMitStatus(BenutzerID);
         res.status(200).json({modul});
     }catch (error) {
        console.log(error);
         next(error);
     }
};

exports.getModulVoraussetzungen = async (req, res, next) => {
    try{
         let modul1 = req.params.Modul;
         const [modulPflicht, _1] = await Modul.getModulVoraussetzungenPflicht(modul1);
         const [modulEmpfohlen, _2] = await Modul.getModulVoraussetzungenPflicht(modul1);
         res.status(200).json({modulPflicht,modulEmpfohlen});
     }catch (error) {
        console.log(error);
         next(error);
     }
};