const Studiengang = require('../module/Studiengang');

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

    // Führe die Konvertierung durch
    const studiengaengeWithUtf8 = convertUmlauteToUtf8(studiengaenge);

    res.status(200).json({ studiengaenge: studiengaengeWithUtf8 });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPflichtModuleVonStudiengang = async (req, res, next) => {
  try {
    let StudiengangKuerzel = req.params.Studiengang;
    const [pflicht, _] = await Studiengang.findAllPflichtModuleFromStudiengang(StudiengangKuerzel);

    // Führe die Konvertierung durch
    const pflichtWithUtf8 = convertUmlauteToUtf8(pflicht);

    res.status(200).json({ pflicht: pflichtWithUtf8 });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getWahlpflichtModuleVonStudiengang = async (req, res, next) => {
  try {
    let StudiengangKuerzel = req.params.Studiengang;
    const [wahlpflicht, _] = await Studiengang.findAllWahlpflichtModuleFromStudiengang(StudiengangKuerzel);

    // Führe die Konvertierung durch
    const wahlpflichtWithUtf8 = convertUmlauteToUtf8(wahlpflicht);

    res.status(200).json({ wahlpflicht: wahlpflichtWithUtf8 });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
