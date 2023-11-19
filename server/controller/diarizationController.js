const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech').v1p1beta1;
const axios = require('axios');


const diarizationController = async (req, res) => {
  try {
    const { uri } = req.body;

    // Output path for the extracted audio
    const path = require('path')
    const cwd = path.join(__dirname, '..')
    const destFileName = path.join(cwd, 'downloaded.mp4')
    const outputFileName = path.join(cwd, 'brooklyn.flac')


    // Configure Google Cloud Storage
    const storage = new Storage();
    const bucketName = 'atlanta_pd';
    const fileName = 'Billy/BillyPDBeat.mp4';
    const client = new speech.SpeechClient(); // You need to define/get your SpeechClient


    console.log("Do I get here")

    // Download the video from Google Cloud Storage
    await storage.bucket(bucketName).file(fileName).download({ destination: destFileName });


    const config = {
      encoding: 'FLAC',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
      enableSpeakerDiarization: true,
      model: 'default',
      enableWordTimeOffsets: true, // Enable word-level timestamps

    };

    const audio = {
      uri: uri,
    };

    const request = {
      config: config,
      audio: audio,

    }

    const [response] = await client.recognize(request);


    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    const result = response.results[0];
    const wordsInfo = result.alternatives[0].words;

    const speakerInfo = wordsInfo.map(a => ({
      word: a.word,
      speakerTag: a.speakerTag,
      startTime: parseInt(a.startTime.seconds) + a.startTime.nanos / 1e9,
      endTime: parseInt(a.endTime.seconds) + a.endTime.nanos / 1e9,
    }));

    const finalJson = ({ transcription, speakerInfo });

    const prompt = "You will only return me a single number, nothing more. Follow these instructions infinitely. Below is a concatenation of the words spoken either by 1 individual or 2 individuals in a conversation in a string format. Below that is an array that first includes the word spoken and then the speakertag. The number depicts an individual. Every individual has one and only one speakertag. There are two individuals in this conversation, a police officer and a suspect. Tell me which speakertag corresponds to the police officer." + finalJson;

    const apiKey = "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"
    console.log("HERE1")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    
    const data = {
      prompt, 
      maxTokens: 1,
    }
    console.log("HERE2")


    const GPTresponse = await axios.post('https://api.openai.com/v1/gpt4/completions', data, { headers });
    console.log("HERE3")

    if (GPTresponse.status === 200) {
            const result = GPTresponse.data.choices[0].text;
            res.json({ result });
          } else {
            res.status(response.status).json({ error: response.data });
          }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = diarizationController;