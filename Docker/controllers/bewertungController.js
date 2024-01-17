const Bewertung = require('../module/Bewertung.js');

exports.getAlleBewertungen = async (req, res, next) => {
  try {
    const [bewertungen, _] = await Bewertung.findAll();

    res.status(200).json({ bewertungen: bewertungen });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAlleBewertungenVonModul = async (req, res, next) => {
  try {
    let Modul = req.params.ModulKuerzel;
    const [bewertungen, _] = await Bewertung.findBewertungenVonModul(Modul);

    res.status(200).json({ bewertungen: bewertungen });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewBewertung = async (req, res, next) => {
  try {
    let { BewertungSterne, Feedback, Schwierigkeitsgrad, Arbeitsaufwand, Lernhilfe, SemsterAnzeigen, ModulKuerzel, BenutzerID } = req.body;
    let bewertung = new Bewertung(BewertungSterne, Feedback, Schwierigkeitsgrad, Arbeitsaufwand, Lernhilfe, SemsterAnzeigen, ModulKuerzel, BenutzerID);

    post = await bewertung.createBewertung();

    console.log(bewertung);

    res.send("Create new Bewertung Route.");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

