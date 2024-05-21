const { connection } = require("../utils/database");

async function AddInsurance(req, res) {
  const Email = req.query.Email;
  const Description = req.query.Description;
  if (!Description || !Email) {
    return res
      .status(400)
      .json({ error: "CompanyName and Description are required" });
  }

  // Check if company exists
  connection.query(
    `SELECT Id FROM Companies WHERE Email = '${Email}'`,
    (err, results) => {
      if (err) {
        console.error("Error checking company: " + err.message);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Company not found" });
      }

      const CompanyId = results[0].Id;

      // Insert into database
      const sql =
        "INSERT INTO Insurance (CompanyId, Description) VALUES (?, ?)";
      connection.query(sql, [CompanyId, Description], (err, result) => {
        if (err) {
          console.error("Error adding insurance: " + err.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Insurance added with ID: ", result.insertId);
        res
          .status(201)
          .json({
            message: "Insurance added successfully",
            id: result.insertId,
          });
      });
    }
  );
}

module.exports = {
  AddInsurance,
};
