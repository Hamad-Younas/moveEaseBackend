const { connection } = require("../utils/database");

async function DeleteInformation(req, response) {
    const Id = req.query.Id; // Assuming you pass the InformationId as a query parameter

    if (!Id) {
        return response.status(400).json({ error: "InformationId is required" });
    }

    try {
        connection.query(`DELETE FROM Information WHERE Id = ?`, [Id], (err, result) => {
            if (err) {
                console.error("Error deleting Information: " + err.message);
                return response.status(500).json({ error: "Internal server error" });
            }
            console.log("Information deleted successfully");
            response.status(200).json({ message: "Information deleted successfully" });
        });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    DeleteInformation,
};
