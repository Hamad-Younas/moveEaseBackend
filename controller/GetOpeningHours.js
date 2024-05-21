const { connection } = require("../utils/database");

async function GetOpeningHours(req, response) {
    const email = req.query.email;
  try {
    connection.query(`SELECT OpeningHours.* from OpeningHours Join Companies On OpeningHours.CompanyId = Companies.Id  where Companies.Email = '${email}'`, (err, res) => {
      if (err) {
        console.log(err)
        return;
      } else {
        console.log(res)
        return response.status(200).json({ data: res });
      }
    });
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
    GetOpeningHours,
};
