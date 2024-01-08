const Bewertung = require('../module/Bewertung.js');

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

exports.getAlleBewertungen = async (req, res, next) => {
  try {
    const [bewertungen, _] = await Bewertung.findAll();

    // Führe die Konvertierung durch
    const bewertungenWithUtf8 = bewertungen.map(item => convertUmlauteToUtf8(item));

    res.status(200).json({ bewertungen: bewertungenWithUtf8 });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAlleBewertungenVonModul = async (req, res, next) => {
  try {
    let Modul = req.params.ModulKuerzel;
    const [bewertungen, _] = await Bewertung.findBewertungenVonModul(Modul);

    // Führe die Konvertierung durch
    const bewertungenWithUtf8 = bewertungen.map(item => convertUmlauteToUtf8(item));

    res.status(200).json({ bewertungen: bewertungenWithUtf8 });
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

