const strftime = require("strftime");
const { connection } = require("../utils/database");
const multer = require("multer");
const storage = require("../utils/multer");
const crypto = require("crypto"); // Import the storage configuration

// Set up multer with the imported storage configuration
const upload = multer({ storage: storage });

// Function to add inventory
async function UpdateLogo(req, response) {
  try {
    // Multer middleware for handling file upload
    upload.single("image")(req, response, function (err) {
      if (err) {
        console.log(err);
        return response.status(500).json({ message: "File upload failed" });
      }

      // Extract data from the request
      const Logo = req.file.filename;
      const Email = req.query.Email;

      connection.query(
        `SELECT * FROM Companies WHERE Email='${Email}'`,
        (err, res) => {
          if (err) {
            // Log an error if there's an issue with the database query
            console.log(err);
            return;
          } else {
            if (res.length != 0) {
              // Prepare data for inserting into the 'course' table
              const data = {
                CompanyId: res[0].Id,
                Logo: Logo,
              };

              // Insert data into the 'course' table
              connection.query(
                "INSERT INTO LogoForUpdation SET ?",
                data,
                (err, res) => {
                  if (err) {
                    // Log an error if there's an issue with the database query
                    console.log("error2");
                    console.log(err);
                    return;
                  } else {
                    return response.status(200).json({ message: "done" });
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

// Export the function for external use
module.exports = {
    UpdateLogo,
};
