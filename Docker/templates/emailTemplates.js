// emailTemplates.js

function betreffEmails(){
return '❗️Aktueller Stand Kredit Punkte';
}
// Function to calculate the next semester based on the number of credits
function calculateNextSemester(credits) {
  if (credits >= 5 && credits <= 29) {
    return 3;
  } else if (credits >= 30 && credits <= 49) {
    return 4;
  } else if (credits >= 50 && credits <= 69) {
    return 5;
  } else if (credits >= 70 && credits <= 89) {
    return 'Praktikum';
  } else if (credits === 90) {
    return 'Bachelor Arbeit';
  } else {
    return 'Unknown Semester';
  }
}

// Function to calculate the required number of credits for the next semester
function calculateNumberOfCredits(nextSemester) {
  switch (nextSemester) {
    case 3:
      return 30;
    case 4:
      return 50;
    case 5:
      return 70;
    case 'Praktikum':
      return 90;
    case 'Bachelor Arbeit':
      return 135;
    default:
      return 0;
  }
}

// Template for the email message Semester beginn
function messageSemesteranfang(user) {
    const nextSemester = calculateNextSemester(user.Credits);
    const numberOfCredits = calculateNumberOfCredits(nextSemester);
    const additionalCredits = numberOfCredits - user.Credits;
  
    return `
    Hi ${user.Vorname},

    du hast  bisher  ${user.Credits} Credits eingesammelt. Gut gemacht, das ist gar nicht so schlecht.

    Aber um die Fächer des ${nextSemester} Semesters schreiben zu können, brauchst du -${numberOfCredits} Credits.
    Du brauchst also ${additionalCredits} mehr Credits.

    Es ist machbar 💪, viel Glück!
    
    Mit besten Grüßen,
    Ihr Digitaler Mentor`;
  }
  
  module.exports = {
    betreffEmails,
    messageSemesteranfang,
  };
  