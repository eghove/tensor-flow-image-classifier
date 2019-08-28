// setting the webcam variable
const webcamElement = document.getElementById('webcam');
// setting variable net
let net;

// asynch function that's going to await the model, I presum
async function app() {
  console.log("Loading mobilenet...");

  // load the model
  net = await mobilenet.load();
  console.log('successfully loaded model');

  // make a prediction using the model and the image we upload
  // const imgEl = document.getElementById('img');
  // const result = await net.classify(imgEl);

  await setupWebcam();
  while (true) {
    const result = await net.classify(webcamElement);

    document.getElementById('console').innerText = `
    prediction: ${result[0].className}\n
    probability: ${result[0].probability}
    `;

    // breathing room for next animation frame to fire

    await tf.nextFrame();

  }
  
}

// webcam function
async function setupWebcam() {
  return new Promise((resolve, reject) => {
    const navigatorAny = navigator;
    navigator.getUserMedia = navigator.getUserMedia ||
      navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
      navigatorAny.msGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true },
        stream => {
          webcamElement.srcObject = stream;
          webcamElement.addEventListener('loadeddata', () => resolve(), false);
        },
        error => reject());
    } else {
      reject();
    }
  });
}

// invoke app()
app();