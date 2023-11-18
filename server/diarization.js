const express = require('express');
const diarizationController = require('./diarizationController');

const app = express();
const port = 3000;

// Create the Google Cloud Speech client
const client = new SpeechClient();

app.use(express.json());

// Pass the client to the controller
app.post('/transcribe', (req, res) => diarizationController(req, res, client));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});