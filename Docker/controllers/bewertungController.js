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
        const { ModulKuerzel, BenutzerID, SemsterAnzeigen, Schwierigkeitsgrad, Arbeitsaufwand, Lernhilfe, PersoenlichesFeedback, Gesamtbewertung } = req.body;
        const bewertung = new Bewertung(ModulKuerzel, BenutzerID, SemsterAnzeigen, Schwierigkeitsgrad, Arbeitsaufwand, Lernhilfe, PersoenlichesFeedback, Gesamtbewertung);

        const newBewertung = await bewertung.createBewertung();

        console.log(newBewertung); // Changed from bewertung to newBewertung for consistency

        res.status(201).json({ message: "Bewertung created successfully", newBewertung });
    } catch (error) {
        console.error(error); // Changed from console.log to console.error for better visibility of errors
        next(error);
    }
};
