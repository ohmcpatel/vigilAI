const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');

const diarizationController = async (req, res, client) => {
  try {
    const { uri } = req.body;

    // Output path for the extracted audio
    const path = require('path')
    const cwd = path.join(__dirname, '..')
    const destFileName = path.join(cwd, 'downloaded.mp4')
    const outputFileName = path.join(cwd, 'output.wav')


    // Configure Google Cloud Storage
    const storage = new Storage();
    const bucketName = 'atlanta_pd';
    const fileName = 'Billy/BillyPDBeat.mp4';

    console.log("Do I get here")

    // Download the video from Google Cloud Storage
    await storage.bucket(bucketName).file(fileName).download({ destination: destFileName });

    console.log("FUCK YEAH")


    // Extract audio from video using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(destFileName)
        .audioCodec('pcm_s16le')
        .audioChannels(1)
        .audioFrequency(8000)
        .on('end', resolve)
        .on('error', reject)
        .save(outputFileName) // Define the output file path here
    });

    console.log("AM I HERE")
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 8000,
      languageCode: 'en-US',
      enableSpeakerDiarization: true,
      minSpeakerCount: 2,
      maxSpeakerCount: 2,
      model: 'phone_call',
    };

    const audio = {
      content: fs.readFileSync(outputFileName).toString('base64'),
    };

    const request = {
      config: config,
      audio: audio,
    };

    const [response] = await client.recognize(request);
    console.log(response);

    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    const result = response.results[response.results.length - 1];
    const wordsInfo = result.alternatives[0].words;

    const speakerInfo = wordsInfo.map(a => ({
      word: a.word,
      speakerTag: a.speakerTag,
    }));

    res.json({ transcription, speakerInfo });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = diarizationController;