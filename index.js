// setting variable net
let net;

// asynch function that's going to await the model, I presum
async function app() {
  console.log("Loading mobilenet...");

  // load the model
  net = await mobilenet.load();
  console.log('successfully loaded model');

  // make a prediction using the model and the image we upload
  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);
  console.log(result)
}

// invoke app()
app();