const Benutzer = require('../module/Benutzer');


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
  
  exports.getAlleBenutzer = async (req, res, next) => {
    try {
      const [benutzer, _] = await Benutzer.findAll();
  
      // Führe die Konvertierung durch
      const benutzerWithUtf8 = benutzer.map(item => convertUmlauteToUtf8(item));
  
      res.status(200).json({ benutzer: benutzerWithUtf8 });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  exports.getBenutzerVonDerID = async (req, res, next) => {
    try {
      let BenutzerID = req.params.BenutzerID;
      const [benutzer, _] = await Benutzer.findUserByID(BenutzerID);
  
      // Führe die Konvertierung durch
      const benutzerWithUtf8 = convertUmlauteToUtf8(benutzer);
  
      res.status(200).json({ benutzer: benutzerWithUtf8 });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };