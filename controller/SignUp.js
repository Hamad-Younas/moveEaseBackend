const strftime = require("strftime");
const { connection } = require("../utils/database");
const multer = require("multer");
const storage = require("../utils/multer");
const crypto = require("crypto"); // Import the storage configuration
const { transporter } = require("../utils/nodemailer.js");

// Set up multer with the imported storage configuration
const upload = multer({ storage: storage });

// Function to add inventory
async function SignUp(req, response) {
  try {
    console.log("hel", req.body)
    // Multer middleware for handling file upload
    upload.single("image")(req, response, function (err) {
      if (err) {
        console.log(err);
        return response.status(500).json({ message: "File upload failed" });
      }

      // Extract data from the request
      const companylogo = req.file.filename;
      const companyname = req.body.companyname;
      const postcode = req.body.postcode;
      const location = req.body.location;
      const street = req.body.street;
      const housenumber = req.body.housenumber;
      const telephonenumber = req.body.telephonenumber;
      var ownergender = 0;

      if (req.query.ownergender === "true") {
        ownergender = 1;
      }

      const ownerfirstname = req.body.ownerfirstname;
      const ownerlastname = req.body.ownerlastname;
      const email = req.body.email;
      const password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
      // Get the current date and time
      const now = new Date();
      const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

      connection.query(
        `SELECT * FROM Companies WHERE Email='${email}'`,
        (err, res) => {
          if (err) {
            // Log an error if there's an issue with the database query
            console.log(err);
            return;
          } else {
            if (res.length == 0) {
              // Prepare data for inserting into the 'course' table
              const data = {
                CompanyName: companyname,
                CompanyLogo: companylogo,
                PostCode: postcode,
                Location: location,
                Street: street,
                HouseNumber: housenumber,
                TelephoneNumber: telephonenumber,
                OwnerGender: ownergender,
                OwnerFirstName: ownerfirstname,
                OwnerLastName: ownerlastname,
                Email: email,
                Password: password,
                CreatedAt: dateCreated,
                UpdatedAt: dateCreated,
                Active: true,
              };

              // Insert data into the 'course' table
              connection.query(
                "INSERT INTO Companies SET ?",
                data,
                (err, res) => {
                  if (err) {
                    // Log an error if there's an issue with the database query
                    console.log("error2");
                    console.log(err);
                    return;
                  } else {

                    connection.query(
                      `SELECT * FROM Companies WHERE Email='${email}'`,
                      (err, res) => {
                        if (err) {
                          // Log an error if there's an issue with the database query
                          console.log(err);
                          return;
                        } else {
                          const companyId = res[0].Id;
                          connection.query(
                            ` INSERT INTO OpeningHours (CompanyId, Day, Time1, Time2)
                            VALUES
                            (${companyId}, 'Monday', '--', '--'),
                            (${companyId}, 'Tuesday', '--', '--'),
                            (${companyId}, 'Wednesday', '--', '--'),
                            (${companyId}, 'Thursday', '--', '--'),
                            (${companyId}, 'Friday', '--', '--'),
                            (${companyId}, 'Saturday', '--', '--'),
                            (${companyId}, 'Sunday', '--', '--');
                            `,
                            (err, res) => {
                              if (err) {
                                // Log an error if there's an issue with the database query
                                console.log("error2");
                                console.log(err);
                                return;
                              } else {
                                console.log("done");
                                try {
                                  transporter.sendMail({
                                    from: process.env.EMAIL,
                                    to: email,
                                    subject: 'Register',
                                    text: 'You are successfully registered to the Move Ease Hub.'
                                  });
                                  console.log('Email sent successfully');
                                } catch (error) {
                                  console.error('Error sending email: ', error);
                                }
                                return response.status(200).json({ message: "added" });
                              }
                            }
                          );
                        }
                      }
                    )
                  }
                }
              );
            } else {
              console.log("already");
              return response.status(200).json({ message: "already" });
            }
          }
        }
      );
    });
  } catch (err) {
    // Log an error if there's an exception in the try block
    console.log(err, "/SignUp");
    return response.status(500).json({ message: "Internal server error" });
  }
}

async function GetCompaniesName(req, res) {

  // SQL query to retrieve feedback and calculate counts
  const sqlQuery = `
      SELECT 
        CompanyName
      FROM 
        Companies;
      `;

  // Execute the query
  connection.query(sqlQuery, (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }

      // Send the results back as JSON
      res.json(results);
  });
}

async function GetCompaniesLocation(req, res) {

  // SQL query to retrieve feedback and calculate counts
  const sqlQuery = `
      SELECT 
        Location
      FROM 
        Companies;
      `;

  // Execute the query
  connection.query(sqlQuery, (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }

      // Send the results back as JSON
      res.json(results);
  });
}


// Export the function for external use
module.exports = {
  SignUp,
  GetCompaniesName,
  GetCompaniesLocation
};
