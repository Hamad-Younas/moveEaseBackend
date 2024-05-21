const { connection } = require("../utils/database");
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

async function GetMoveRequests(req, res) {

    // SQL query to retrieve feedback and calculate counts
    const sqlQuery = `
        SELECT 
            *
        FROM 
            moverequest;
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

async function GetMoveRequestsLocations(req, res) {

    // SQL query to retrieve feedback and calculate counts
    const sqlQuery = `
        SELECT 
            FromLocation
        FROM 
            moverequest;
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

async function GetMoveRequestsCount(req, res) {

    // SQL query to retrieve feedback and calculate counts
    const sqlQuery = `
        SELECT 
            COUNT(FromLocation) as count
        FROM 
            moverequest;
        `;

    // Execute the query
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Send the results back as JSON
        return res.status(200).json({ count: results[0].count });
    });
}

async function GetMoveRequestsCountActive(req, res) {

    // SQL query to retrieve feedback and calculate counts
    const sqlQuery = `
    SELECT 
        COUNT(FromLocation) AS count
    FROM 
        moverequest
    WHERE 
        active = TRUE;
        `;

    // Execute the query
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Send the results back as JSON
        return res.status(200).json({ count: results[0].count });
    });
}

async function GetMoveRequestsCountinactive(req, res) {

    // SQL query to retrieve feedback and calculate counts
    const sqlQuery = `
    SELECT 
        COUNT(FromLocation) AS count
    FROM 
        moverequest
    WHERE 
        active = FALSE;
        `;

    // Execute the query
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Send the results back as JSON
        return res.status(200).json({ count: results[0].count });
    });
}

async function GetMoveRequestsCountpending(req, res) {

    // SQL query to retrieve feedback and calculate counts
    const sqlQuery = `
    SELECT 
        COUNT(FromLocation) AS count
    FROM 
        moverequest
    WHERE 
        active IS NULL;

        `;

    // Execute the query
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Send the results back as JSON
        return res.status(200).json({ count: results[0].count });
    });
}


async function FilterMoveRequests(req, res) {
    const { CompanyName = "", Location = "", sortBy = "" } = req.query;

    try {
        // SQL query to retrieve the company emails
        const emailQuery = `
            SELECT Email
            FROM Companies
            WHERE CompanyName = ?;
        `;
        const emailResults = await query(emailQuery, [CompanyName]);

        if (!emailResults || emailResults.length === 0) {
            res.status(404).json({ error: 'Company not found' });
            return;
        }

        // Extract all emails from the results
        const companyEmails = emailResults.map(result => result.Email);
        console.log(companyEmails)

        // SQL query to retrieve move requests for any of the company emails
        let moveRequestQuery = `
            SELECT *
            FROM moverequest
            WHERE CompanyEmail IN (${companyEmails.map(email => '?').join(', ')})
            AND FromLocation = ?
        `;

        // Add sorting if provided
        if (sortBy) {
            moveRequestQuery += ` ORDER BY ${connection.escapeId(sortBy)}`;
        }

        // Combine company emails and location into query parameters
        const queryParams = [...companyEmails, Location];

        const moveRequestResults = await query(moveRequestQuery, queryParams);
        console
        res.json(moveRequestResults);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function GetMoveRequest(req, res) {
    try {
        const { FromLocation = "", AfterLocation = "", LivingSpace = "" } = req.query;

        // Check if any of the required parameters are missing
        if (!FromLocation || !AfterLocation || !LivingSpace) {
            res.status(400).json({ error: 'Missing required parameters' });
            return;
        }

        // SQL query to retrieve move requests
        const sqlQuery = `
            SELECT 
                *
            FROM 
                moverequest
            WHERE 
                FromLocation = ? AND AfterLocation = ? AND LivingSpace = ?
        `;

        // Execute the query
        connection.query(sqlQuery, [FromLocation, AfterLocation, LivingSpace], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            // Send the results back as JSON
            res.json(results);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    GetMoveRequests,
    FilterMoveRequests,
    GetMoveRequestsLocations,
    GetMoveRequest,
    GetMoveRequestsCount,
    GetMoveRequestsCountActive,
    GetMoveRequestsCountinactive,
    GetMoveRequestsCountpending
};