const Studiengang = require('../module/Studiengang');


exports.getAlleStudiengaenge = async (req, res, next) => {
  try {
    const [studiengaenge, _] = await Studiengang.findAll();

    // Führe die Konvertierung durch
    const studiengaengeWithUtf8 = convertUmlauteToUtf8(studiengaenge);

    res.status(200).json({ studiengaenge: studiengaengeWithUtf8 });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getStudiengangInfo = async (req, res, next) => {
  try {
    let StudiengangKuerzel = req.params.Studiengang;
    const [studiengaenge, _] = await Studiengang.findStudiengangInfo(StudiengangKuerzel);

    res.status(200).json({ studiengaenge: studiengaenge });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPflichtModuleVonStudiengang = async (req, res, next) => {
  try {
    let StudiengangKuerzel = req.params.Studiengang;
    const [pflicht, _] = await Studiengang.findAllPflichtModuleFromStudiengang(StudiengangKuerzel);


    res.status(200).json({ pflicht: pflicht });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getWahlpflichtModuleVonStudiengang = async (req, res, next) => {
  try {
    let StudiengangKuerzel = req.params.Studiengang;
    const [wahlpflicht, _] = await Studiengang.findAllWahlpflichtModuleFromStudiengang(StudiengangKuerzel);

    res.status(200).json({ wahlpflicht: wahlpflicht});
  } catch (error) {
    console.log(error);
    next(error);
  }
};
