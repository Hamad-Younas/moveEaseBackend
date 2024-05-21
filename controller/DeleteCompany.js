const { connection } = require("../utils/database");

async function DeleteCompany(req, response) {
    const Email = req.query.Email; // Assuming you pass the Email as a query parameter

    if (!Email) {
        return response.status(400).json({ error: "Email is required" });
    }

    try {
        await new Promise((resolve, reject) => {
            connection.query(`DELETE FROM Companies WHERE Email = ?`, [Email], (err, result) => {
                if (err) {
                    console.error("Error deleting Company: " + err.message);
                    return reject(err);
                }
                console.log("Company deleted successfully");
                resolve();
            });
        });

        await new Promise((resolve, reject) => {
            connection.query(`DELETE FROM moverequest WHERE CompanyEmail = ?`, [Email], (err, result) => {
                if (err) {
                    console.error("Error deleting Move Requests: " + err.message);
                    return reject(err);
                }
                console.log("Move Requests deleted successfully");
                resolve();
            });
        });

        response.status(200).json({ message: "Company and associated Move Requests deleted successfully" });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    DeleteCompany,
};