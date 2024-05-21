const { connection } = require("../utils/database");
const { transporter } = require("../utils/nodemailer.js");

async function FeedBack(req, res) {
    const { pfm_price, pfm_quality, pfm_behaviour, pfm_company, rating, comment, firstname, lastname, email } = req.body;
    console.log(req.body);
    try {
        const sql = `INSERT INTO feedback (pfm_price, pfm_quality, pfm_behaviour, pfm_company, rating, comment, firstname, lastname, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Values to be inserted into the table
        const values = [pfm_price, pfm_quality, pfm_behaviour, pfm_company, rating, comment, firstname, lastname, email];

        // Execute the query
        connection.query(sql, values, async (err, result) => {
            if (err) {
                console.error('Error inserting feedback: ', err);
                return res.status(500).json({ error: 'Failed to add feedback' });
            }
            console.log('Feedback added successfully');
            
            // Send email upon successful feedback submission
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Thank you for your feedback',
                    text: 'We appreciate your valuable feedback. Thank you for taking the time to share your thoughts with us.'
                });
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Error sending email: ', error);
            }

            return res.status(200).json({ message: 'Feedback added successfully' });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    FeedBack,
};
