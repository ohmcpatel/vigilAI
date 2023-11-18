
const diarizationController = async (req, res, client) => {
  try {
    const { uri } = req.body;

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
      uri: uri,
    };

    const request = {
      config: config,
      audio: audio,
    };

    const [response] = await client.recognize(request);
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

module.exports = diarizationController

