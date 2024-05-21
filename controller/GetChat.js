const { connection } = require('../utils/database');

async function GetChat(req, resp) {
    const name = req.headers['name'];
    const id = req.headers['id'];
    console.log(id)
    const receiverName = 'Move Ease';

    if (!name || !id) {
        return resp.status(400).json({ message: 'Name and ID are required' });
    }

    try {
        
        connection.query( `
        SELECT * FROM chat 
        WHERE (recieverName = '${receiverName}' AND userId = '${id}') 
           OR (recieverName = '${name}' AND userId IS NULL)
    `, (err, result) => {
            if (err) {
                console.error(err);
                return resp.status(500).json({ message: 'Internal server error' });
            }
            console.log(result);
            resp.status(200).json({ data: result });
        });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    GetChat
};
