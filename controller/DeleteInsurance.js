const { connection } = require("../utils/database");

async function DeleteInsurance(req, response) {
    const Id = req.query.Id; // Assuming you pass the InsuranceId as a query parameter

    if (!Id) {
        return response.status(400).json({ error: "InsuranceId is required" });
    }

    try {
        connection.query(`DELETE FROM Insurance WHERE Id = ?`, [Id], (err, result) => {
            if (err) {
                console.error("Error deleting Insurance: " + err.message);
                return response.status(500).json({ error: "Internal server error" });
            }
            console.log("Insurance deleted successfully");
            response.status(200).json({ message: "Insurance deleted successfully" });
        });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    DeleteInsurance,
};
