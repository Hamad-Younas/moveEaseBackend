const { connection } = require("../utils/database");

async function DeleteService(req, response) {
    const Id = req.query.Id; // Assuming you pass the ServiceId as a query parameter

    if (!Id) {
        return response.status(400).json({ error: "ServiceId is required" });
    }

    try {
        connection.query(`DELETE FROM Service WHERE Id = ?`, [Id], (err, result) => {
            if (err) {
                console.error("Error deleting Service: " + err.message);
                return response.status(500).json({ error: "Internal server error" });
            }
            console.log("Service deleted successfully");
            response.status(200).json({ message: "Service deleted successfully" });
        });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    DeleteService,
};
