const { connection } = require("../utils/database");

async function UpdateMovReq(req, res) {
    const id = req.query.id; // Assuming you pass the ID as a query parameter

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(`UPDATE moverequest SET active = TRUE WHERE id = ?`, [id], (err, result) => {
                if (err) {
                    console.error("Error updating Move Request: " + err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    return resolve(null); // No rows were updated
                }
                console.log("Move Request updated successfully");
                resolve(result);
            });
        });

        if (result === null) {
            return res.status(404).json({ error: "Move Request not found" });
        }

        res.status(200).json({ message: "Move Request updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function UpdateMovReqin(req, res) {
    const id = req.query.id; // Assuming you pass the ID as a query parameter

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(`UPDATE moverequest SET active = FALSE WHERE id = ?`, [id], (err, result) => {
                if (err) {
                    console.error("Error updating Move Request: " + err.message);
                    return reject(err);
                }
                if (result.affectedRows === 0) {
                    return resolve(null); // No rows were updated
                }
                console.log("Move Request updated successfully");
                resolve(result);
            });
        });

        if (result === null) {
            return res.status(404).json({ error: "Move Request not found" });
        }

        res.status(200).json({ message: "Move Request updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    UpdateMovReq,
    UpdateMovReqin
};