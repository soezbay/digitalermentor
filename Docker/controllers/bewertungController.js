const Bewertung = require('../module/Bewertung');

exports.getAlleBewertungen = async (req, res, next) => {
    try {
        const [bewertungen, _] = await Bewertung.findAll();

        res.status(200).json({ bewertungen });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createNewBewertung = async (req, res, next) => {
    try {
        let { BewertungsID,Bewertung,Feedback,Schwierigkeitsgrad,Arbeitsaufwand,Lernhilfe,SemsterAnzeigen  , ModulKuerzel, BenutzerID } = req.body;
        let bewertung = new Bewertung(BewertungsID,Bewertung,Feedback,Schwierigkeitsgrad,Arbeitsaufwand,Lernhilfe,SemsterAnzeigen  , ModulKuerzel, BenutzerID);

        post = await bewertung.createBewertung();

        console.log(bewertung);

        res.send("Create new Bewertung Route.");
    } catch (error) {
        console.log(error);
        next(error);
    }
};
