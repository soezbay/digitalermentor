const Cache = require('../module/Cache');

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

exports.getCache = async (req, res, next) => {
  try {
    let BenutzerID = req.params.BenutzerID;
    const [Daten, _] = await Cache.getCache(BenutzerID);

    // Führe die Konvertierung durch
    const datenWithUtf8 = convertUmlauteToUtf8(Daten);

    res.status(200).json({ Daten: datenWithUtf8 });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.getLastUpdateTime = async (req, res, next) => {
  try {
    let BenutzerID = req.params.BenutzerID;
    const [TimeStamp, _] = await Cache.getLastUpdate(BenutzerID);

    // Führe die Konvertierung durch
    const timeStampWithUtf8 = convertUmlauteToUtf8(TimeStamp);

    res.status(200).json({ TimeStamp: timeStampWithUtf8 });
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

    // Führe die Konvertierung durch
    const datenWithUtf8 = convertUmlauteToUtf8(Daten);

    res.status(200).json({ Daten: datenWithUtf8 });
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