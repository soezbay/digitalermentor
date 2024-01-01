const Email = require('../module/Email');

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

exports.getEmailsFromBenutzer = async (req, res, next) => {
  try {
    let Benutzer = req.params.BenutzerID;
    const [Emails, _] = await Email.getAllEmailsfromBenutzer(Benutzer);

    // Führe die Konvertierung durch
    const emailsWithUtf8 = convertUmlauteToUtf8(Emails);

    res.status(200).json({ Emails: emailsWithUtf8 });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewEmail = async (req, res, next) => {
  try {
    let { EmailInhalt, BenutzerID } = req.body;
    let email = new Email(EmailInhalt, BenutzerID);

    post = await email.addEmails();

    res.send("Create new Email Route.");
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.deleteEmail = async (req, res, next) => {
  try {
    let EmailID = req.params.EmailID;
    const [Daten, _] = await Email.deleteEmail(EmailID);

    // Führe die Konvertierung durch
    const datenWithUtf8 = convertUmlauteToUtf8(Daten);

    res.status(200).json({ Daten: datenWithUtf8 });
  } catch (error) {
    console.log(error);
    next(error);
  }
}