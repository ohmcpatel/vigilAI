const express = require('express');
const router = express.Router();
const { SpeechClient } = require('@google-cloud/speech').v1p1beta1;
const diarizationController = require('../controller/diarizationController')




router.post('/transcribe', async (req, res) => {
    console.log(req.body)
    try {
    
    
      // Assuming client is passed to your controller function
      const client = new SpeechClient(); // You need to define/get your SpeechClient
  
      // Call your existing controller function passing req, res, and client
      await diarizationController(req, res, client);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(700).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;

