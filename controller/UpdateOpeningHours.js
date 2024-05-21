const { connection } = require("../utils/database");

async function UpdateOpeningHours(req, response) {
    const Id = req.query.Id;
    const Time1 = req.query.Time1;
    const Time2 = req.query.Time2;
    
    const newData = {
        Time1: Time1,
        Time2: Time2,
    };

    try {
        connection.query(`UPDATE OpeningHours SET ? WHERE Id = ?`, [newData, Id], (err, res) => {
            if (err) {
                console.log(err);
                return response.status(500).json({ error: "Internal server error" });
            } else {
                console.log(res);
                return response.status(200).json({ message: "Opening Hours updated successfully" });
            }
        });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    UpdateOpeningHours,
};
