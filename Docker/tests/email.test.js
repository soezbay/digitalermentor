var mail = require("nodemailer");
var transp = mail.createTransport("SMTP",{
    host: "smtp.gmail.com",
    port: 465,
    secureConnection: true,
    auth: {
        user: "digitalermentor@gmail.com",
        pass: "Softwareprojekt2023"
    }
});
transp.sendMail({
        to:   "foguengmerveille@gmail.com",
        subject: "Test",
        text: "Versendet mit Nodemailer"
    },
    function(err,response){
        if(err){
            console.log(err);
        }
        console.log(response);
});