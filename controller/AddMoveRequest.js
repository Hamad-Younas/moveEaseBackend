const strftime = require("strftime");
const { connection } = require("../utils/database");
const { transporter } = require("../utils/nodemailer.js");

async function AddMoveRequest(req, response) {
  try {
    // Destructure req.query and provide default values if they are not defined
    const {
      fromlocation = "",
      livingspace = "",
      date = "",
      afterlocation = "",
      abstractelevator = "",
      abstractentrance = "",
      abstractfloor = "",
      abstractperson = "",
      abstractroom = "",
      abstractButton = "",
      indentButton = "",
      indentelevator = "",
      indententrance = "",
      indentfloor = "",
      payButton = "",
      viewingAppointment = "",
      noParkingSign = "",
      attic = "",
      basementCellar = "",
      buildKitchen = "",
      dismantleKitchen = "",
      assembleFurniture = "",
      dismantleFurniture = "",
      packBoxes = "",
      unpackBoxes = "",
      attachLamps = "",
      removeLamps = "",
      internalstorage = "",
      Individualwishes = "",
      genderButton = "",
      firstname = "",
      lastname = "",
      phone = "",
      email = "",
      companyEmail = ""
    } = req.query;
    console.log(req.query);
    const trimmedData = {
      FromLocation: fromlocation.trim(),
      LivingSpace: livingspace.trim(),
      Date: date.trim(),
      AfterLocation: afterlocation.trim(),
      AbstractFloor: abstractfloor.trim(),
      AbstractElevator: abstractelevator.trim(),
      AbstractEntrance: abstractentrance.trim(),
      AbstractRoom: abstractroom.trim(),
      AbstractPerson: abstractperson.trim(),
      AbstractHouse: abstractButton.trim(),
      IndentHouse: indentButton.trim(),
      IndentFloor: indentfloor.trim(),
      IndentElevator: indentelevator.trim(),
      IndentEntrance: indententrance.trim(),
      ViewingAppointment: viewingAppointment.trim(),
      Pay: payButton.trim(),
      NoParkingSign: noParkingSign.trim(),
      Attic: attic.trim(),
      BasementCellar: basementCellar.trim(),
      BuildKitchen: buildKitchen.trim(),
      DismantleKitchen: dismantleKitchen.trim(),
      AssembleFurniture: assembleFurniture.trim(),
      DismantleFurniture: dismantleFurniture.trim(),
      PackBoxes: packBoxes.trim(),
      UnpackBoxes: unpackBoxes.trim(),
      AttachLamps: attachLamps.trim(),
      RemoveLamps: removeLamps.trim(),
      InternalStorage: internalstorage.trim(),
      IndividualWishes: Individualwishes.trim(),
      Gender: genderButton.trim(),
      FirstName: firstname.trim(),
      LastName: lastname.trim(),
      Phone: phone.trim(),
      Email: email.trim(),
      CompanyEmail: companyEmail.trim()
    };

    console.log(trimmedData);

    // Insert into the database table `moverequest`
    const insertQuery = "INSERT INTO moverequest SET ?";
    await connection.query(insertQuery, trimmedData);
    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Move Request',
        text: 'Your Move Request is under review.'
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email: ', error);
    }

    return response.status(200).json({ message: "Data inserted successfully" });
  } catch (err) {
    // Log an error if there's an exception in the try block
    console.log(err, "/SignUp");
    return response.status(500).json({ message: "Internal server error" });
  }
}

// Export the function for external use
module.exports = {
  AddMoveRequest,
};
