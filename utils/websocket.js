// server.js
const WebSocket = require('ws');
const { connection } = require('./database');
const fs = require('fs');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files'); // Destination directory for file uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Unique filename
  }
});

const upload = multer({ storage: storage }).single('file');

function createWebSocketServer(port) {
  const wss = new WebSocket.Server({ port });

  wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
      const receivedMessage = JSON.parse(message);
      let file = '';

      if (receivedMessage.file) {
        const { name, type, data } = receivedMessage.file;

        const base64Data = data.replace(/^data:\w+\/\w+;base64,/, '');

        const buffer = Buffer.from(base64Data, 'base64');

        const filename = Date.now() + name;
        const filePath = `./public/files/${filename}`;
        file = filename;

        fs.writeFile(filePath, buffer, err => {
          if (err) {
            console.error('Error saving file:', err);
          } else {
            console.log('File saved successfully:', name);
          }
        });
      }

      const acknowledgmentMessage = {
        messageId: receivedMessage.id,
        text: receivedMessage.text,
        userId: receivedMessage.userId,
        chatId: receivedMessage.chatId,
        userImage: receivedMessage.userImage,
        recieverName: receivedMessage.recieverName,
        file: file,
        status: 'received', 
      };

      wss.clients.forEach(function each(client) {
        if (client.readyState == WebSocket.OPEN) {
          client.send(JSON.stringify(acknowledgmentMessage));
        }
      });

      INSERTDATA(acknowledgmentMessage);
    });

    ws.on('close', function () {
      console.log('Client disconnected');
    });
  });

  return wss;
}

function INSERTDATA(acknowledgmentMessage) {
  connection.query('INSERT INTO chat SET ? ', acknowledgmentMessage, (err, res) => {
    if (err) throw err;
    else {
      console.log('inserted');
    }
  })
}

module.exports = createWebSocketServer;
