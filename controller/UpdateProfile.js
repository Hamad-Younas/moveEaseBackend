const { connection } = require("../utils/database");

async function UpdateProfile(req, response) {
    const Email = req.query.Email;
    const Location = req.query.Location;
    const Street = req.query.Street;
    const HouseNumber = req.query.HouseNumber;
    const TelephoneNumber = req.query.TelephoneNumber;
    const Website = req.query.Website;
    
    const newData = {
        Location: Location,
        Street: Street,
        HouseNumber: HouseNumber,
        TelephoneNumber: TelephoneNumber,
        Website: Website
    };

    try {
        connection.query(`UPDATE Companies SET ? WHERE Email = ?`, [newData, Email], (err, res) => {
            if (err) {
                console.log(err);
                return response.status(500).json({ error: "Internal server error" });
            } else {
                console.log(res);
                return response.status(200).json({ message: "Profile updated successfully" });
            }
        });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    UpdateProfile,
};
