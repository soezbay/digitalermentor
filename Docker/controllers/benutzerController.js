const Benutzer = require('../module/Benutzer');
  
  exports.getAlleBenutzer = async (req, res, next) => {
    try {
      const [benutzer, _] = await Benutzer.findAll();
  
      res.status(200).json({ benutzer: benutzer });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  exports.getBenutzerVonDerID = async (req, res, next) => {
    try {
      let BenutzerID = req.params.BenutzerID;
      const [benutzer, _] = await Benutzer.findUserByID(BenutzerID);
  

  
      res.status(200).json({ benutzer: benutzer });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };