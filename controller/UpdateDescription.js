const { connection } = require("../utils/database");

async function UpdateDescription(req, response) {
    const Email = req.query.Email;
    const Description = req.query.Description;
    
    const newData = {
        Description: Description,
    };

    try {
        connection.query(`UPDATE Companies SET ? WHERE Email = ?`, [newData, Email], (err, res) => {
            if (err) {
                console.log(err);
                return response.status(500).json({ error: "Internal server error" });
            } else {
                console.log(res);
                return response.status(200).json({ message: "Description updated successfully" });
            }
        });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    UpdateDescription,
};
