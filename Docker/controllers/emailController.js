const Email = require('../module/Email');

exports.getEmailsFromBenutzer = async (req, res, next) => {
    try {
        let Benutzer = req.params.BenutzerID;
        const [Emails, _] = await Email.getAllEmailsfromBenutzer(Benutzer);

        res.status(200).json({ Emails });
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
        res.status(200).json({ Daten });
    } catch (error) {
        console.log(error);
        next(error);
    }
}