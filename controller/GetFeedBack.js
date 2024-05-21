const { connection } = require("../utils/database");

async function FeedBack(req, res) {

    // SQL query to retrieve feedback and calculate counts
    const sqlQuery = `
    SELECT 
        SUM(rating) / COUNT(*) AS average_rating,
        COUNT(*) AS total_count,
        SUM(CASE WHEN rating > 4.5 THEN 1 ELSE 0 END) AS rating5,
        SUM(CASE WHEN rating > 3.5 AND rating <= 4.5 THEN 1 ELSE 0 END) AS rating4,
        SUM(CASE WHEN rating > 2.5 AND rating <= 3.5 THEN 1 ELSE 0 END) AS rating3,
        SUM(CASE WHEN rating > 1.5 AND rating <= 2.5 THEN 1 ELSE 0 END) AS rating2,
        SUM(CASE WHEN rating <= 1.5 THEN 1 ELSE 0 END) AS rating1
    FROM 
        feedback;
    `;

    // Execute the query
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Send the results back as JSON
        res.json(results[0]);
    });
}

async function GetFeedBack(req, res) {

    // SQL query to retrieve feedback and calculate counts
    const sqlQuery = `
    SELECT 
        *
    FROM 
        feedback;
    `;

    // Execute the query
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Send the results back as JSON
        res.json(results);
    });
}

module.exports = {
    FeedBack,
    GetFeedBack
};