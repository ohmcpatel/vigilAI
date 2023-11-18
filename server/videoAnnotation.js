const { VideoIntelligenceServiceClient } = require('@google-cloud/video-intelligence');
const fs = require('fs');

async function annotateVideo() {
  // Replace with the actual path to your video file on Google Cloud Storage
  const inputUri = 'gs://path/to/your/video.mp4';

  // Replace with the path to your service account key file
  const keyFilePath = 'path/to/keyfile.json';

  // Create a Video Intelligence client with your key file
  const client = new VideoIntelligenceServiceClient({
    keyFilename: keyFilePath,
  });

  // Specify the features you want to annotate (LABEL_DETECTION, SHOT_CHANGE_DETECTION, etc.)
  const features = ['LABEL_DETECTION'];

  // Create a request object
  const request = {
    inputUri: inputUri,
    features: features,
  };

  try {
    // Call the annotateVideo method
    const [operation] = await client.annotateVideo(request);

    // Wait for the operation to complete
    const [operationResult] = await operation.promise();

    // Process the results
    const annotations = operationResult.annotationResults;
    annotations.forEach(annotation => {
      console.log('Annotation Description:', annotation.displayName);
      annotation.segments.forEach(segment => {
        console.log('Start Time:', segment.startTimeOffset.seconds + '.' + segment.startTimeOffset.nanos / 1e9);
        console.log('End Time:', segment.endTimeOffset.seconds + '.' + segment.endTimeOffset.nanos / 1e9);
      });
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}

annotateVideo();