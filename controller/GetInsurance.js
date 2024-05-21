const { connection } = require("../utils/database");

async function GetInsurance(req, response) {
  const email = req.query.email;
  try {
    connection.query(
      `SELECT  Insurance.Id,Insurance.Description from Insurance Join Companies On Insurance.CompanyId = Companies.Id  where Companies.Email = '${email}'`,
      (err, res) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(res);
          return response.status(200).json({ data: res });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  GetInsurance,
};
